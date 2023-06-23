const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});

// connection.connect((err) =>
// {
//     if (err) throw err;
//     console.log("Connected!");

//     const sqlQuery = `drop table testTable`;
//     connection.query(sqlQuery, (err, res) =>
//     {
//         if (err) throw err;
//         console.log(res);
//         console.log("Table Deleted");
//     })
// })

// drop only if exist 

connection.connect((err) =>
{
    if (err) throw err;
    console.log("Connected!");

    const sqlQuery = `DROP TABLE IF EXISTS testTable`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;
        console.log(res);
        // console.log("Table Deleted");
    })
})