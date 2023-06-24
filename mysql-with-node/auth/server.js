const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

env.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const port = process.env.PORT;
let refreshTokens = [];
const app = express();
let connection = require('./database');

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

                const userId = result.insertId;
                refreshTokens = refreshTokens.filter(token =>
                {
                    const decoded = jwt.decode(token);
                    return decoded.id !== userId;
                });

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


                const token = jwt.sign({ id: user.id }, accessTokenSecret, { expiresIn: '1h' });
                const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret);

                refreshTokens.push(refreshToken);

                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: `Hi ${user.name}, You are Login Successfully`,
                    error: false,
                    token: token,
                    refreshToken: refreshToken
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


app.post('/refresh-token', (req, res) =>
{
    const { refreshToken } = req.body;

    if (!refreshToken)
    {
        return res.status(401).json({
            code: 401,
            status: false,
            message: 'Refresh token not provided',
            error: false
        });
    }

    if (!refreshTokens.includes(refreshToken))
    {
        return res.status(403).json({
            code: 403,
            status: false,
            message: 'Invalid refresh token',
            error: false
        });
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) =>
    {
        if (err)
        {
            return res.status(403).json({
                code: 403,
                status: false,
                message: 'Invalid refresh token',
                error: err
            });
        }

        const newToken = jwt.sign({ id: decoded.id }, accessTokenSecret, { expiresIn: '1h' });
        return res.status(200).json({
            code: 200,
            status: true,
            message: 'Token refreshed successfully',
            error: false,
            token: newToken
        });
    });
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




// Middleware to verify the access token
function verifyAccessToken(req, res, next)
{
    const token = req.headers.authorization;

    if (!token)
    {
        return res.status(401).json({
            code: 401,
            status: false,
            message: 'Access token not provided',
            error: false
        });
    }

    try
    {
        const decoded = jwt.verify(token, accessTokenSecret);

        req.user = decoded;

        next();
    } catch (err)
    {
        return res.status(403).json({
            code: 403,
            status: false,
            message: 'Invalid access token',
            error: err
        });
    }
}

// Protected route
app.get('/protected-route', verifyAccessToken, (req, res) =>
{
    return res.status(200).json({
        code: 200,
        status: true,
        message: 'Access granted to protected route',
        user: req.user
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