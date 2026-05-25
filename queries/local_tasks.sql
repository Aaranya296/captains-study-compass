-- Show all pending student tasks ordered by deadline

SELECT
  task_id,
  title,
  category,
  deadline,
  difficulty,
  status,
  skill_id
FROM tasks
WHERE status != 'done'
ORDER BY deadline ASC;

