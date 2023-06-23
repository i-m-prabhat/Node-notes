const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});


// Sort the result alphabetically by name:

// connection.connect((err) =>
// {
//     if (err) throw err;

//     console.log("Connected to the MySQL server");

//     const sqlQuery = `SELECT * FROM customers ORDER BY name`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;
//         console.log(res);
//     })
// })



// Sort the result reverse alphabetically by name:
connection.connect((err) =>
{
    if (err) throw err;

    console.log("Connected to the MySQL server");

    const sqlQuery = `SELECT * FROM customers ORDER BY name DESC`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;
        console.log(res);
    })
})