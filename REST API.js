// Примерен REST API с Node.js и Express

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// MySQL връзка
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// API endpoints

// GET всички служители
app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET служител по ID
app.get('/api/employees/:id', (req, res) => {
    db.query('SELECT * FROM employees WHERE emp_id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// GET всички отдели
app.get('/api/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET служители по отдел
app.get('/api/departments/:id/employees', (req, res) => {
    db.query('SELECT * FROM employees WHERE dept_id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET проекти
app.get('/api/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST нов служител
app.post('/api/employees', (req, res) => {
    const { first_name, last_name, job_title, salary, dept_id } = req.body;
    db.query(
        'INSERT INTO employees (first_name, last_name, job_title, salary, dept_id) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, job_title, salary, dept_id],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, message: 'Employee created' });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});