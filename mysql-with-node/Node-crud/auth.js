const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(express.json());

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
        console.log('Database connection established');
    } else
    {
        console.log(`Can't connect to the database right now: ${err}`);
    }
});

app.post('/register', (req, res) =>
{
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) =>
    {
        if (err)
        {
            console.error('Error hashing password: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const values = [name, email, hashedPassword];

        mysqlConnection.query(query, values, (err, result) =>
        {
            if (err)
            {
                console.error('Error inserting user into the database: ', err);
                return res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'Error registering a user',
                    error: err
                });
            }

            return res.status(200).json({
                code: 200,
                status: true,
                message: 'Registration successful',
                error: false
            });
        });
    });
});

app.post('/login', (req, res) =>
{
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    mysqlConnection.query(query, values, (err, results) =>
    {
        if (err)
        {
            console.error('Error fetching user from the database: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0)
        {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) =>
        {
            if (err)
            {
                console.error('Error comparing passwords: ', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!isMatch)
            {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate a JSON Web Token (JWT) and send it back to the client
            const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key');

            return res.status(200).json({
                code: 200,
                status: true,
                message: 'Login successful',
                token
            });
        });
    });
});



app.get('/users', (req, res) =>
{
    const query = 'SELECT * FROM users';

    mysqlConnection.query(query, (err, results) =>
    {
        if (err)
        {
            console.error('Error fetching users from the database: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const users = results.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }));

        return res.status(200).json({ users });
    });
});

app.get('/', (req, res) =>
{
    res.send("<h1>Node Server Working!</h1>");
});

app.listen(port, () =>
{
    console.log(`Server Started on Port ${port}`);
});
