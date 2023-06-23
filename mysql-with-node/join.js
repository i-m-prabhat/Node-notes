const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});


// Select records with a match in both tables:
// i can use INNER JOIN instead of JOIN

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("Connected!");

//     const sqlQuery = `SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     })
// })



// Left Join
// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("Connected!");

//     const sqlQuery = `SELECT users.name AS user, products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.id`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     })
// })

// Right Join
connection.connect((err) =>
{
    if (err) throw err;
    console.log("Connected!");

    const sqlQuery = `SELECT users.name AS user, products.name AS favorite FROM users RIGHT JOIN products ON users.favorite_product = products.id`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;

        console.log(res);
    })
})
