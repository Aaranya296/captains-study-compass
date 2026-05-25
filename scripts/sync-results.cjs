const fs = require("fs");
const path = require("path");

const root = process.cwd();

function readCsv(filePath) {
  const content = fs.readFileSync(filePath, "utf-8").trim();
  const [headerLine, ...lines] = content.split("\n");
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    const row = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim();
    });

    return row;
  });
}

function daysUntil(dateString) {
  const today = new Date("2026-05-25");
  const deadline = new Date(dateString);
  return Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
}

const tasks = readCsv(path.join(root, "data/tasks.csv"));
const skills = readCsv(path.join(root, "data/skills.csv"));
const repos = readCsv(path.join(root, "data/github_repos.csv"));

const enrichedTasks = tasks
  .filter((task) => task.status !== "done")
  .map((task) => {
    const skill = skills.find((s) => s.skill_id === task.skill_id);
    const daysLeft = daysUntil(task.deadline);
    const difficulty = Number(task.difficulty);
    const confidence = Number(skill?.confidence_level || 50);

    const priorityScore =
      difficulty * 12 + Math.max(0, 30 - daysLeft * 5) + Math.max(0, 70 - confidence);

    return {
      title: task.title,
      category: task.category,
      deadline: task.deadline,
      difficulty,
      skill_name: skill?.skill_name || "Unknown",
      confidence_level: confidence,
      priorityScore,
      reason: `Priority is based on deadline, difficulty, and ${skill?.skill_name || "skill"} confidence.`
    };
  })
  .sort((a, b) => b.priorityScore - a.priorityScore);

const weakSkills = skills
  .filter((skill) => Number(skill.confidence_level) < 60)
  .map((skill) => ({
    skill_name: skill.skill_name,
    confidence_level: Number(skill.confidence_level)
  }))
  .sort((a, b) => a.confidence_level - b.confidence_level);

const githubProgress = repos
  .filter((repo) => Number(repo.open_issues) > 0 || Number(repo.progress_percent) < 70)
  .map((repo) => ({
    repo_name: repo.repo_name,
    description: repo.description,
    tech_stack: repo.tech_stack,
    open_issues: Number(repo.open_issues),
    progress_percent: Number(repo.progress_percent)
  }))
  .sort((a, b) => a.progress_percent - b.progress_percent);

const todayCommand = enrichedTasks[0];

const results = {
  todayCommand: {
    title: todayCommand.title,
    category: todayCommand.category,
    deadline: todayCommand.deadline,
    priorityScore: todayCommand.priorityScore,
    reason: todayCommand.reason
  },
  overdueTasks: enrichedTasks.filter((task) => daysUntil(task.deadline) < 0),
  weakSkills,
  githubProgress,
  priorityTasks: enrichedTasks,
  coralQueries: [
    {
      name: "priority_join.sql",
      purpose: "Joins student tasks with weak skills to decide what to work on first.",
      sql: "SELECT t.task_id, t.title, t.category, t.deadline, t.difficulty, s.skill_name, s.confidence_level FROM tasks t JOIN skills s ON t.skill_id = s.skill_id WHERE t.status != 'done' ORDER BY t.deadline ASC, s.confidence_level ASC;"
    },
    {
      name: "github_progress.sql",
      purpose: "Finds GitHub-style projects that need attention.",
      sql: "SELECT repo_id, repo_name, description, tech_stack, open_issues, progress_percent FROM github_repos WHERE open_issues > 0 OR progress_percent < 70 ORDER BY progress_percent ASC, open_issues DESC;"
    }
  ]
};

fs.mkdirSync(path.join(root, "public/data"), { recursive: true });
fs.writeFileSync(
  path.join(root, "public/data/results.json"),
  JSON.stringify(results, null, 2)
);

console.log("Generated public/data/results.json successfully.");