-- Show GitHub-style projects that need attention

SELECT
  repo_id,
  repo_name,
  description,
  tech_stack,
  open_issues,
  progress_percent,
  related_skill_id
FROM github_repos
WHERE open_issues > 0
   OR progress_percent < 70
ORDER BY progress_percent ASC, open_issues DESC;
