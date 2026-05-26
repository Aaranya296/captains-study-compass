import { useEffect, useState } from "react";
import "./App.css";

function StatCard({ label, value, subtext }) {
  return (
    <div className="card stat-card">
      <p className="label">{label}</p>
      <h2>{value}</h2>
      <p className="muted">{subtext}</p>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/data/results.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  if (!data) {
    return <div className="loading">Loading Captain’s Study Compass...</div>;
  }

  const categories = ["All", "SQL", "Web Dev", "DSA", "GitHub", "Hackathon"];

  const filteredTasks = (
    activeCategory === "All"
      ? data.priorityTasks
      : data.priorityTasks.filter((task) => task.category === activeCategory)
  ).slice(0, 7);

  return (
    <main className="app">
      <section className="hero">
        <p className="badge">Pirates of the Coral-bean Hackathon</p>
        <h1>Captain’s Study Compass</h1>
        <p>
          A personal agent dashboard that turns scattered student data into a daily action plan using Coral-style SQL logic across tasks, skills, deadlines, and GitHub-style project progress.
        </p>
      </section>

      <section className="grid stats">
        <StatCard
          label="Today’s Command"
          value={data.todayCommand.title}
          subtext={data.todayCommand.reason}
        />
        <StatCard
          label="Priority Score"
          value={data.todayCommand.priorityScore}
          subtext="Calculated from deadline, difficulty, and weak skill confidence."
        />
        <StatCard
          label="Weak Skills"
          value={data.weakSkills.length}
          subtext="Skills below 60% confidence."
        />
        <StatCard
          label="Repos Needing Attention"
          value={data.githubProgress.length}
          subtext="Projects with open issues or low progress."
        />
      </section>

      <section className="card">
        <div className="section-head">
          <div>
            <p className="label">Priority Map</p>
            <h2>What should I work on next?</h2>
            <p className="muted">
  Higher score means higher priority based on deadline pressure, task difficulty, and weak skill confidence.
</p>
          </div>

          <div className="filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Weak Skill</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.deadline}</td>
                  <td>
                    {task.skill_name} ({task.confidence_level}%)
                  </td>
                  <td className="score">{task.priorityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <p className="label">Weak Skill Radar</p>
          <h2>Skills to revise</h2>
          <div className="list">
            {data.weakSkills.map((skill) => (
              <div className="list-item" key={skill.skill_name}>
                <span>{skill.skill_name}</span>
                <strong>{skill.confidence_level}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="label">GitHub Shipyard</p>
          <h2>Projects needing attention</h2>
          <div className="list">
            {data.githubProgress.map((repo) => (
              <div className="list-item" key={repo.repo_name}>
                <div>
                  <span>{repo.repo_name}</span>
                  <p className="muted">{repo.description}</p>
                </div>
                <strong>{repo.progress_percent}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="card">
  <p className="label">Decision Logic</p>
  <h2>How the priority score is calculated</h2>

  <div className="logic-grid">
    <div className="logic-item">
      <strong>Deadline Pressure</strong>
      <span>Tasks closer to the current hackathon date get higher priority.</span>
    </div>

    <div className="logic-item">
      <strong>Difficulty</strong>
      <span>Harder tasks are ranked higher because they need more focused time.</span>
    </div>

    <div className="logic-item">
      <strong>Weak Skill Confidence</strong>
      <span>Tasks connected to weaker skills are prioritized for learning growth.</span>
    </div>
  </div>
</section>

      <section className="card">
        <p className="label">Coral SQL Deck</p>
        <h2>Queries used by the project</h2>

        <div className="queries">
          {data.coralQueries.map((query) => (
            <div className="query-box" key={query.name}>
              <h3>{query.name}</h3>
              <p>{query.purpose}</p>
              <pre>{query.sql}</pre>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
  <p className="label">Coral Integration Proof</p>
  <h2>How Coral fits into this project</h2>

  <div className="proof-grid">
    <div className="proof-item">
      <strong>Coral CLI</strong>
      <span>Installed and configured locally through Ubuntu/WSL.</span>
    </div>

    <div className="proof-item">
      <strong>GitHub Source</strong>
      <span>GitHub source was added using Coral interactive setup.</span>
    </div>

    <div className="proof-item">
      <strong>Local Data Sources</strong>
      <span>Student tasks, skills, and repo progress are stored as CSV files.</span>
    </div>

    <div className="proof-item">
      <strong>SQL Query Files</strong>
      <span>Queries inside /queries show how the sources can be joined.</span>
    </div>
  </div>

  <p className="muted coral-note">
    Coral allows different sources such as APIs, databases, and files to be
    queried using SQL. In this prototype, student tasks, weak skill data, and
    GitHub-style project progress are structured as queryable sources and
    converted into a daily action dashboard.
  </p>
</section>

      <section className="card story">
        <p className="label">Why Coral matters</p>
        <h2>One SQL layer over scattered student data</h2>
        <p>
          Without Coral, a student would need separate scripts, manual file checks, and API handling to understand what needs attention. Coral’s SQL-first approach makes scattered data easier to query, join, and convert into decisions. This project demonstrates that idea through a student productivity workflow.
        </p>
      </section>
    </main>
  
  
  );
}

export default App;