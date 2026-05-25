# Captain’s Study Compass

A personal agent dashboard built for the **Pirates of the Coral-bean Hackathon** by WeMakeDevs.

## Live Demo

Live site: https://captains-study-compass.vercel.app/

GitHub repo: https://github.com/Aaranya296/captains-study-compass

---

## One-Line Pitch

Captain’s Study Compass helps students decide **what to work on today** by combining study tasks, weak skills, deadlines, and GitHub-style project progress into one priority dashboard.

---

## Problem

Students preparing for placements, hackathons, and projects often have scattered data across different places:

- study tasks
- deadlines
- weak topics
- GitHub repositories
- project progress
- notes and SQL query files

Because this data is scattered, students waste time deciding what to do next instead of actually working.

---

## Solution

Captain’s Study Compass turns scattered student productivity data into a simple dashboard.

It takes task data, skill confidence data, and GitHub-style repository progress data, then generates a daily priority map.

The dashboard answers:

> What should I work on today?

---

## Track

**Track 2: Personal Agent**

This project fits the Personal Agent track because it is built for an individual student’s productivity workflow.

---

## Features

- Today’s most important task
- Priority score based on deadline, difficulty, and weak skill confidence
- Weak skill radar
- GitHub project progress section
- Project attention tracker
- Coral SQL query viewer
- Coral Integration Proof section
- CSV-to-JSON data pipeline
- Clean ocean/pirate themed dashboard
- Deployed live using Vercel

---

## Coral Usage

This project is built around Coral’s main idea:

> Query different sources using SQL.

The project includes Coral-style SQL files that show how scattered data sources can be joined and queried.

The data sources used in this prototype are:

- `data/tasks.csv`
- `data/skills.csv`
- `data/github_repos.csv`

The SQL query files are stored inside the `queries/` folder:

- `local_tasks.sql`
- `priority_join.sql`
- `github_progress.sql`
- `github_test.sql`
- `cross_source_priority.sql`

The most important query is:

```sql
SELECT
  t.task_id,
  t.title AS task_title,
  t.category,
  t.deadline,
  t.difficulty,
  s.skill_name,
  s.confidence_level,
  g.repo_name,
  g.open_issues,
  g.progress_percent
FROM tasks t
JOIN skills s
  ON t.skill_id = s.skill_id
LEFT JOIN github_repos g
  ON s.skill_id = g.related_skill_id
WHERE t.status != 'done'
ORDER BY
  t.deadline ASC,
  s.confidence_level ASC,
  g.progress_percent ASC;
```

This query shows the main idea of the project:

```txt
student tasks + weak skills + GitHub-style project progress
        ↓
cross-source SQL logic
        ↓
daily priority dashboard
```

---

## Coral Commands Used

Coral was installed and configured locally through Ubuntu/WSL.

Useful commands used during setup:

```bash
coral source list
coral source add --interactive github
coral sql "SELECT * FROM github.meta LIMIT 1"
```

The GitHub source was successfully added in Coral.

The project also includes local SQL query files that demonstrate how student tasks, weak skills, and GitHub-style repository data can be queried and joined.

---

## Tech Stack

- **React** — frontend UI
- **Vite** — fast development and build tool
- **JavaScript** — project logic
- **CSS** — custom ocean/pirate themed styling
- **Node.js** — data sync script
- **CSV** — local structured data
- **JSON** — dashboard data output
- **GitHub** — version control and submission
- **Vercel** — deployment
- **Coral CLI** — SQL-based source querying concept

---

## Project Structure

```txt
captains-study-compass/
├── data/
│   ├── tasks.csv
│   ├── skills.csv
│   └── github_repos.csv
│
├── queries/
│   ├── github_progress.sql
│   ├── github_test.sql
│   ├── local_tasks.sql
│   ├── priority_join.sql
│   └── cross_source_priority.sql
│
├── scripts/
│   └── sync-results.cjs
│
├── public/
│   └── data/
│       └── results.json
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── README.md
├── package.json
├── package-lock.json
├── index.html
└── vite.config.js
```

---

## How It Works

```txt
CSV files
   ↓
scripts/sync-results.cjs
   ↓
public/data/results.json
   ↓
React dashboard
```

The CSV files store student tasks, skill confidence, and GitHub-style project progress.

The sync script converts that data into JSON.

The React dashboard reads the JSON and displays the final priority dashboard.

---

## Data Flow

### 1. Local Data

The project starts with three CSV files:

```txt
data/tasks.csv
data/skills.csv
data/github_repos.csv
```

These files represent the student’s current work, skill confidence, and project progress.

### 2. Data Sync

The script:

```txt
scripts/sync-results.cjs
```

reads the CSV files and generates:

```txt
public/data/results.json
```

### 3. Dashboard

The React app reads:

```txt
public/data/results.json
```

and displays the final dashboard.

---

## Run Locally

Clone the repository:

```bash
git clone https://github.com/Aaranya296/captains-study-compass.git
```

Move into the project folder:

```bash
cd captains-study-compass
```

Install dependencies:

```bash
npm install
```

Generate dashboard data from CSV files:

```bash
npm run sync
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal:

```txt
http://localhost:5173
```

Build for production:

```bash
npm run build
```

---

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run sync
```

Generates `public/data/results.json` from CSV data.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Previews the production build locally.

---

## Judging Criteria Alignment

### Potential Impact

The project helps students reduce confusion and decide what to work on next.

### Creativity & Originality

It applies Coral-style cross-source SQL thinking to student productivity and placement preparation.

### Technical Implementation

The project includes:

- React dashboard
- CSV data source
- Node.js sync script
- JSON output
- SQL query files
- deployed live app


### Learning & Growth

This project was built from a beginner-friendly stack while learning:

- GitHub
- Coral
- React
- Vite
- deployment
- SQL query organization

### Best Use of Coral

The project demonstrates how scattered personal data can be queried and joined using SQL-style workflows.

---

## Current Status

Working prototype completed:

- Dashboard is running
- CSV-to-JSON pipeline works
- Coral-style SQL query files are included
- GitHub repository is public
- Live site is deployed on Vercel
- Coral GitHub source was configured locally

---

## Future Improvements

- Connect live GitHub repository data directly through Coral queries
- Add more personal data sources like notes, deadlines, and calendar exports
- Improve priority scoring with more advanced SQL logic
- Add a search/filter system for tasks and skills
- Add screenshots and demo video inside the README
- Add more Coral sources beyond local CSV and GitHub-style data

---

## Submission Info

**Hackathon:** Pirates of the Coral-bean  
**Organizer:** WeMakeDevs  
**Track:** Personal Agent  
**Project Name:** Captain’s Study Compass  
**Live Demo:** https://captains-study-compass.vercel.app/  
**GitHub Repo:** https://github.com/Aaranya296/captains-study-compass

---

## Author

Built by **Aaranya Mandal** for the Pirates of the Coral-bean Hackathon.