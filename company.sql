/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Използване на съществуващата база данни
USE `company`;

-- =============================================
-- РЕШЕНИЯ НА ЗАДАЧИТЕ
-- =============================================

-- Задача 1: Имена и длъжности на всички служители
SELECT 
    CONCAT(first_name, ' ', last_name) AS 'Име',
    job_title AS 'Длъжност'
FROM employees;

-- Задача 2: (няма в условието)

-- Задача 3: Служители със заплата по-голяма от 50 000
SELECT 
    CONCAT(first_name, ' ', last_name) AS 'Име',
    salary AS 'Заплата'
FROM employees
WHERE salary > 50000;

-- Задача 4: Списък с всички градове
SELECT 
    name AS 'Град'
FROM towns
ORDER BY name;

-- Задача 5: Всички адреси, които се намират в град София
SELECT 
    a.address_text AS 'Адрес',
    t.name AS 'Град'
FROM addresses a
JOIN towns t ON a.town_id = t.town_id
WHERE t.name = 'Sofia';

-- Задача 6: Всички служители, които работят в отдел "Sales"
SELECT 
    CONCAT(e.first_name, ' ', e.last_name) AS 'Име',
    e.job_title AS 'Длъжност',
    d.name AS 'Отдел'
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.name = 'Sales';

-- Задача 7: Имена и начални дати на проекти, започнали след 1 януари 2003 г.
SELECT 
    name AS 'Проект',
    DATE(start_date) AS 'Начална дата'
FROM projects
WHERE start_date > '2003-01-01'
ORDER BY start_date;

-- Задача 8: Брой на служителите във всеки отдел
SELECT 
    d.name AS 'Отдел',
    COUNT(e.employee_id) AS 'Брой служители'
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.name
ORDER BY COUNT(e.employee_id) DESC;

-- Задача 9: Служители, които нямат ръководител (manager_id IS NULL)
SELECT 
    CONCAT(first_name, ' ', last_name) AS 'Име',
    job_title AS 'Длъжност'
FROM employees
WHERE manager_id IS NULL;

-- Задача 10: Всички активни проекти, които нямат крайна дата
SELECT 
    name AS 'Проект',
    DATE(start_date) AS 'Начална дата',
    'активен' AS 'Статус'
FROM projects
WHERE end_date IS NULL
ORDER BY start_date;

-- =============================================
-- ДОПЪЛНИТЕЛНИ ПОЛЕЗНИ ЗАЯВКИ
-- =============================================

-- Служители с техните адреси и градове
SELECT 
    CONCAT(e.first_name, ' ', e.last_name) AS 'Служител',
    e.job_title AS 'Длъжност',
    d.name AS 'Отдел',
    a.address_text AS 'Адрес',
    t.name AS 'Град',
    e.salary AS 'Заплата'
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
LEFT JOIN addresses a ON e.address_id = a.address_id
LEFT JOIN towns t ON a.town_id = t.town_id
ORDER BY e.last_name, e.first_name;

-- Брой служители по градове
SELECT 
    t.name AS 'Град',
    COUNT(e.employee_id) AS 'Брой служители'
FROM towns t
LEFT JOIN addresses a ON t.town_id = a.town_id
LEFT JOIN employees e ON a.address_id = e.address_id
GROUP BY t.town_id, t.name
ORDER BY COUNT(e.employee_id) DESC;

-- Средна заплата по отдели
SELECT 
    d.name AS 'Отдел',
    ROUND(AVG(e.salary), 2) AS 'Средна заплата',
    MIN(e.salary) AS 'Минимална',
    MAX(e.salary) AS 'Максимална'
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.name
ORDER BY AVG(e.salary) DESC;

-- Проекти и броя на служителите по тях
SELECT 
    p.name AS 'Проект',
    COUNT(ep.employee_id) AS 'Брой служители'
FROM projects p
LEFT JOIN employees_projects ep ON p.project_id = ep.project_id
GROUP BY p.project_id, p.name
ORDER BY COUNT(ep.employee_id) DESC;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
