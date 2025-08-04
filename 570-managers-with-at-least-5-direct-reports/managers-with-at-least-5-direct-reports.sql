SELECT e.name
FROM Employee e
JOIN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) AS mgr
ON e.id = mgr.managerId;
