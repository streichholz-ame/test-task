-- get all statuses, not repeating, alphabetically ordered 

SELECT DISTINCT status FROM tasks ORDER BY status ASC;


-- get the count of all tasks in each project, order by tasks count descending

SELECT COUNT(*) AS tasksByProject FROM tasks GROUP BY project_id ORDER BY tasksByProject DESC;


-- get the count of all tasks in each project, order by projects names 

SELECT COUNT(t.id) FROM tasks t
JOIN projects p ON t.project_id = p.id
GROUP BY p.name ORDER BY p.name ASC;


-- get the tasks for all projects having the name beginning with "N" letter 

SELECT t.name FROM tasks t
JOIN projects p ON t.project_id = p.id
WHERE p.name LIKE 'N%';


-- get the list of all projects containing the 'a' letter 
-- in the middle of the name, and show the tasks count near each project. 
-- Mention that there can exist projects without tasks and tasks with project_id = NULL

SELECT (
    SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id
) AS tasksByProject, p.name FROM projects p
WHERE p.name LIKE '%a%';


-- get the list of tasks with duplicate names. Order alphabetically

SELECT t.name FROM tasks t
GROUP BY t.name
HAVING COUNT(*) > 1
ORDER BY t.name ASC


-- get list of tasks having several exact matches of both name and status, from the project 'Garage'. Order by matches count 

SELECT t.name FROM tasks t
JOIN projects p ON t.project_id = p.id
WHERE p.name = 'Garage'
GROUP BY t.name, t.status
HAVING COUNT(*) > 1
ORDER BY COUNT(*);


-- get the list of project names having more than 10 tasks in status 'completed'. Order by project_id 


SELECT p.name FROM projects p
JOIN tasks t ON t.project_id = p.id
WHERE t.status = 'completed' 
GROUP BY p.name, t.project_id
HAVING COUNT(*) > 10
ORDER BY t.project_id