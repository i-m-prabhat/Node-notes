const mysql = require('mysql');

const connection = mysql.createConnection({
    "host": "localhost",
    // "port": "3306",
    "user": "root",
    "password": "",
})

connection.connect((err) =>
{
    if (err) throw err;
    console.log("Connected!");
    const sqlQuery = `create database testDB`;

    connection.query(sqlQuery, (err, result) =>
    {
        if (err) throw err;
        console.log(result);
        console.log("Database created");
    })
})