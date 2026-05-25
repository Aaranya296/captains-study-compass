-- Join student tasks with weak skills
-- This query shows which pending tasks are connected to weak skills

SELECT
  t.task_id,
  t.title,
  t.category,
  t.deadline,
  t.difficulty,
  s.skill_name,
  s.confidence_level
FROM tasks t
JOIN skills s
  ON t.skill_id = s.skill_id
WHERE t.status != 'done'
ORDER BY t.deadline ASC, s.confidence_level ASC;
