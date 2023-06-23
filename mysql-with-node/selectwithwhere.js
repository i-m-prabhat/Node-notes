const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});


// Select record(s) with the address "Park Lane 38":

// connection.connect((err) =>
// {
//     if (err) throw err;

//     console.log("connected to the DB");

//     const sqlQuery = `SELECT * FROM customers WHERE address = 'Park Lane 38'`;

//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     });
// });




// Select records where the address starts with the letter 'S':

// connection.connect((err) =>
// {
//     if (err) throw err;

//     console.log("connected to the DB");

//     const sqlQuery = `SELECT * FROM customers WHERE address like 'S%'`;

//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     });
// });


// Escape query values by using the mysql.escape() method:

// connection.connect((err) =>
// {
//     if (err) throw err;

//     console.log("connected to the DB");

//     const adr = 'Mountain 21';
//     const sqlQuery = `SELECT * FROM customers WHERE address = ${mysql.escape(adr)}`;

//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     });
// });


// Escape query values by using the placeholder ? method :

// connection.connect((err) =>
// {
//     if (err) throw err;

//     console.log("connected to the DB");

//     const adr = 'Mountain 21';
//     const sqlQuery = `SELECT * FROM customers WHERE address = ?`;

//     connection.query(sqlQuery, [adr], (err, res) =>
//     {
//         if (err) throw err;

//         console.log(res);
//     });
// });


// using multiple placeholder 

connection.connect((err) =>
{
    if (err) throw err;

    console.log("connected to the DB");

    const name = 'Amy';
    const adr = 'Mountain 21';
    const sqlQuery = `SELECT * FROM customers WHERE name = ? OR address = ?`;

    connection.query(sqlQuery, [name, adr], (err, res) =>
    {
        if (err) throw err;

        console.log(res);
    });
});

