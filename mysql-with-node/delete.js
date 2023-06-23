const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});

connection.connect((err) =>
{
    if (err) throw err;
    console.log('connected to the db');

    const sqlQuery = `DELETE FROM customers WHERE address = 'Mountain 21'`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;
        console.log(res);
        console.log(`Number of records deleted: ${res.affectedRows}`);
    })
})