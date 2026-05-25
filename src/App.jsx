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

  const filteredTasks =
    activeCategory === "All"
      ? data.priorityTasks
      : data.priorityTasks.filter((task) => task.category === activeCategory);

  return (
    <main className="app">
      <section className="hero">
        <p className="badge">Pirates of the Coral-bean Hackathon</p>
        <h1>Captain’s Study Compass</h1>
        <p>
          A personal agent dashboard that uses Coral SQL thinking to combine
          study tasks, weak skills, deadlines, and GitHub project progress.
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

      <section className="card story">
        <p className="label">Why Coral matters</p>
        <h2>One SQL layer over scattered student data</h2>
        <p>
          Without Coral, a student would manually check files, notes, deadlines,
          and GitHub projects separately. This project shows how Coral-style SQL
          can join these sources and turn them into a simple daily action plan.
        </p>
      </section>
    </main>
  );
}

export default App;