// Note: To be able to get the inserted id, only one row can be inserted.

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
    console.log("Connected!");

    const sqlQuery = `INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')`;

    connection.query(sqlQuery, (err, res) =>
    {
        if (!err)
        {
            console.log(`1 record inserted, ID: ${res.insertId}`);
        } else
        {
            console.log(err);
        }
    })

})