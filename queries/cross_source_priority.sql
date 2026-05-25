-- Cross-source priority query
-- Combines student tasks, weak skills, and GitHub-style repo progress
-- Purpose: decide what the student should work on first

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