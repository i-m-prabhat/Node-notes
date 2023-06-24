const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const connection = require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/register', async (req, res) =>
{
    const { name, email, password } = req.body;

    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailExistsQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(emailExistsQuery, [email], (err, result) =>
        {
            if (err)
            {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'Failed to register user',
                    error: err
                });
            }

            if (result.length > 0)
            {
                return res.status(400).json({
                    code: 400,
                    status: false,
                    message: 'User already exists',
                    error: 'Email already in use'
                });
            }


            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            connection.query(query, [name, email, hashedPassword], (err, result) =>
            {
                if (err)
                {
                    console.log(err);
                    return res.status(500).json({
                        code: 500,
                        status: false,
                        message: 'Failed to register user',
                        error: err
                    });
                }

                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'User registered successfully',
                    error: false
                });
            });
        });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Failed to register user',
            error: err
        });
    }
});



app.post('/login', async (req, res) =>
{
    const { email, password } = req.body;

    try
    {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], async (err, result) =>
        {
            if (err)
            {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'Failed to authenticate user',
                    error: err
                });
            }
            if (result.length === 0)
            {
                return res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'User not found',
                    error: false
                });
            }

            const user = result[0];

            try
            {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid)
                {
                    return res.status(401).json({
                        code: 401,
                        status: false,
                        message: 'Invalid password',
                        error: false
                    });
                }

                const token = jwt.sign({ id: user.id }, 'dfghj#$%^F&^%$jhgDF', { expiresIn: '1h' });

                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'Login successful',
                    error: false,
                    token: token
                });

            } catch (err)
            {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'Failed to authenticate user',
                    error: err
                });
            }
        });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Failed to authenticate user',
            error: err
        });
    }
});


app.get('/users', (req, res) =>
{
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) =>
    {
        if (err)
        {
            console.log(err);
            return res.status(500).json({
                code: 500,
                status: false,
                message: 'Failed to fetch users',
                error: err
            });
        }

        return res.status(200).json({
            code: 200,
            status: true,
            message: 'Users fetched successfully',
            users: results
        });
    });
});


app.use((req, res) =>
{
    res.status(404).json({
        code: 404,
        status: false,
        message: 'Endpoint not found',
        error: 'Invalid endpoint'
    });
});



app.listen(port, () =>
{
    console.log(`server is running on port ${port}`);
})