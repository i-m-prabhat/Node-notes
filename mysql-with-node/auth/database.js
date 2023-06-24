const mysql = require('mysql');
const env = require('dotenv');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME
});

connection.connect((err) =>
{
    if (err) throw err;
    console.log("DB Connected!");
})

module.exports = connection;