const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "testDB"
});


// Select the 5 first records in the "customers" table:

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("connected!");

//     const sqlQuery = `SELECT * FROM customers LIMIT 5`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     })
// })


// Start from position 3, and return the next 5 records:
// Note: "OFFSET 2", means starting from the third position, not the second!

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("connected!");

//     const sqlQuery = `SELECT * FROM customers LIMIT 5 OFFSET 2`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     })
// })


// Start from position 3, and return the next 5 records:
// Note: The numbers are reversed: "LIMIT 2, 5" is the same as "LIMIT 5 OFFSET 2"

connection.connect((err) =>
{
    if (err) throw err;
    console.log("connected!");

    const sqlQuery = `SELECT * FROM customers LIMIT 2,5`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;

        console.log(res);
    })
})

