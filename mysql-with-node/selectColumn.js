// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "testDB"
// });

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("connected to database");

// const sqlQuery = `select * from customers`;

//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (!err)
//         {
//             console.log(res);
//         } else
//         {
//             console.error(`Error in query ${err}`);
//         }
//     })
// })


// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "testDB"
// });

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("connected to database");


//     const sqlQuery = `SELECT name, address FROM customers`;

//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (!err)
//         {
//             console.log(res);
//         } else
//         {
//             console.error(`Error in query ${err}`);
//         }
//     })
// })


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});

connection.connect((err) =>
{
    if (err) throw err;
    console.log("connected to database");


    const sqlQuery = `SELECT name, address FROM customers`;

    connection.query(sqlQuery, (err, res, fields) =>
    {
        if (!err)
        {
            // console.log(res);
            console.log(fields);
            console.log(fields[1].name);
        } else
        {
            console.error(`Error in query ${err}`);
        }
    })
})