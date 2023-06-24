const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

env.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const port = process.env.PORT;
let refreshTokens = [];
const app = express();
let connection = require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'email@gmail.com',
        pass: 'app password',
    }
});

// Generate OTP
const generateOTP = () =>
{
    // const OTP_LENGTH = 6;
    return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/register', async (req, res) =>
{
    const { name, email, password } = req.body;

    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP(); // Generate OTP

        const emailExistsQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(emailExistsQuery, [email], async (err, result) =>
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

            const query = 'INSERT INTO users (name, email, password, otp, first_login) VALUES (?, ?, ?, ?, 0)';


            connection.query(query, [name, email, hashedPassword, otp], async (err, result) =>
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

                // Send the verification email with the generated OTP
                const mailOptions = {
                    from: 'your-email@gmail.com',
                    to: email,
                    subject: 'Email Verification',
                    text: `Your verification OTP: ${otp}`
                };

                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(500).json({
                            code: 500,
                            status: false,
                            message: 'Failed to send verification email',
                            error: error
                        });
                    }

                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        message: 'Verification email sent',
                        error: false
                    });
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




app.post('/verify-email', async (req, res) =>
{
    const { email, otp } = req.body;

    const getOTPQuery = 'SELECT otp FROM users WHERE email = ?';
    connection.query(getOTPQuery, [email], async (err, result) =>
    {
        if (err)
        {
            console.log(err);
            return res.status(500).json({
                code: 500,
                status: false,
                message: 'Failed to verify email',
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

        const storedOTP = result[0].otp;

        if (otp === storedOTP)
        {
            const updateQuery = 'UPDATE users SET email_verified = 1 WHERE email = ?';
            connection.query(updateQuery, [email], (err, result) =>
            {
                if (err)
                {
                    console.log(err);
                    return res.status(500).json({
                        code: 500,
                        status: false,
                        message: 'Failed to verify email',
                        error: err
                    });
                }

                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'Email verified successfully',
                    error: false
                });
            });
        } else
        {
            return res.status(401).json({
                code: 401,
                status: false,
                message: 'Invalid OTP',
                error: false
            });
        }
    });
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

            if (!user.email_verified)
            {
                return res.status(401).json({
                    code: 401,
                    status: false,
                    message: 'Email not verified',
                    error: false
                });
            }

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

                // Check if the user has already logged in before
                if (!user.first_login)
                {
                    // Send welcome email
                    const welcomeMailOptions = {
                        from: 'your mail',
                        to: email,
                        subject: 'Welcome to our application',
                        text: `Dear ${user.name}, Welcome to our application. We're glad to have you on board!`
                    };

                    transporter.sendMail(welcomeMailOptions, (error, info) =>
                    {
                        if (error)
                        {
                            console.log(error);
                            return res.status(500).json({
                                code: 500,
                                status: false,
                                message: 'Failed to send welcome email',
                                error: error
                            });
                        }

                        console.log('Welcome email sent: ' + info.response);
                        // Update the user's first_login flag in the database
                        const updateFirstLoginQuery = 'UPDATE users SET first_login = 1 WHERE email = ?';
                        connection.query(updateFirstLoginQuery, [email], (err, result) =>
                        {
                            if (err)
                            {
                                console.log(err);
                                return res.status(500).json({
                                    code: 500,
                                    status: false,
                                    message: 'Failed to update first login status',
                                    error: err
                                });
                            }

                            return res.status(200).json({
                                code: 200,
                                status: true,
                                message: `Hi ${user.name}, You are Login Successfully`,
                                error: false,
                                token: token,
                                refreshToken: refreshToken
                            });
                        });
                    });
                } else
                {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        message: `Hi ${user.name}, You are Login Successfully`,
                        error: false,
                        token: token,
                        refreshToken: refreshToken
                    });
                }

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
});
