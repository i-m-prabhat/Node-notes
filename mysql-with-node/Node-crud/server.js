const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(express.json());

// Makeing  Auth : Login Signup 

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: ''
});

mysqlConnection.connect((err) =>
{
    if (!err)
    {
        console.log('Database Connection created');
    } else
    {
        console.log(`Can't connect to the database right now: ${err}`);
    }
});

app.post('/api/employee', (req, res) =>
{
    const { name, email, experience, sallery } = req.body;
    const query = `INSERT INTO employee (name, email, experience, sallery) VALUES ('${name}', '${email}', '${experience}', ${sallery})`;

    mysqlConnection.query(query, (err, result) =>
    {
        if (!err)
        {
            res.status(200).json({
                code: 200,
                status: true,
                message: "Employee created successfully.",
                error: false

            });
        } else
        {
            console.error('Error creating an employee:', err);
            res.status(500).json({
                code: 500,
                status: true,
                message: "Error creating an employee",
                error: err

            });
        }
    });
});

app.get('/api/employee', (req, res) =>
{
    const query = 'SELECT * FROM employee';

    mysqlConnection.query(query, (err, results) =>
    {
        if (!err)
        {
            res.json(results);
        } else
        {
            console.error('Error retrieving employees:', err);
            res.status(500).send('Error retrieving employees');
        }
    });
});

app.get('/api/employee/:id', (req, res) =>
{
    const id = req.params.id;
    const query = `SELECT * FROM employee WHERE id=${id}`;

    mysqlConnection.query(query, (err, result) =>
    {
        if (err)
        {
            console.error('Error retrieving an employee:', err);
            res.status(500).send('Error retrieving an employee');
        } else if (result.length === 0)
        {
            res.status(404).send('Employee not found');
        } else
        {
            res.json(result[0]);
        }
    });
});

app.put('/api/employee/:id', (req, res) =>
{
    const id = req.params.id;
    const { name, email, experience, sallery } = req.body;
    const query = `UPDATE employee SET name='${name}', email='${email}', experience='${experience}', sallery=${sallery} WHERE id=${id}`;

    mysqlConnection.query(query, (err, result) =>
    {
        if (err)
        {
            console.error('Error updating an employee:', err);
            res.status(500).send('Error updating an employee');
        } else if (result.affectedRows === 0)
        {
            res.status(404).send('Employee not found');
        } else
        {
            res.send('Employee updated successfully');
        }
    });
});

app.delete('/api/employee/:id', (req, res) =>
{
    const id = req.params.id;
    const query = `DELETE FROM employee WHERE id=${id}`;

    mysqlConnection.query(query, (err, result) =>
    {
        if (err)
        {
            console.error('Error deleting an employee:', err);
            res.status(500).send('Error deleting an employee');
        } else if (result.affectedRows === 0)
        {
            res.status(404).send('Employee not found');
        } else
        {
            res.send('Employee deleted successfully');
        }
    });
});

app.get('/', (req, res) =>
{
    res.send("<h1>Hello from Node Server</h1>");
})

app.listen(port, () =>
{
    console.log(`Server Started on Port ${port}`);
});
