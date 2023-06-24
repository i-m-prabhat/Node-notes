const express = require('express');
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());



const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'appwork'
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

// Login endpoint
app.post('/login', (req, res) =>
{
    const { email, password } = req.body;

    // Retrieve the user from the database based on the provided email
    mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) =>
    {
        if (err)
        {
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0)
        {
            res.status(401).json({ error: 'Invalid email or password' });
        } else
        {
            const user = results[0];

            // Compare the provided password with the hashed password stored in the database
            bcrypt.compare(password, user.password, (err, isMatch) =>
            {
                if (err)
                {
                    res.status(500).json({ error: 'Internal server error' });
                } else if (!isMatch)
                {
                    res.status(401).json({ error: 'Invalid email or password' });
                } else
                {
                    // Generate a JSON Web Token (JWT) and send it back to the client
                    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key');
                    res.json({ token });
                }
            });
        }
    });
});

// Signup endpoint
app.post('/signup', (req, res) =>
{
    const { name, email, password } = req.body;

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) =>
    {
        if (err)
        {
            res.status(500).json({ error: 'Internal server error' });
        } else
        {
            // Insert the new user into the database
            mysqlConnection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) =>
            {
                if (err)
                {
                    res.status(500).json({ error: 'Internal server error' });
                } else
                {
                    res.sendStatus(201);
                }
            });
        }
    });
});

// Logout endpoint (optional)
app.post('/logout', (req, res) =>
{
    // Perform any necessary logout actions (e.g., invalidate tokens, clear session data)
    res.sendStatus(200);
});

app.listen(PORT, () =>
{
    console.log(`Server listening on port ${PORT}`);
});
