const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
});

connection.connect((err) =>
{
    if (err)
    {
        console.log("Error connecting to DB");
        return;
    } else
    {
        console.log("Connected!");
    }

    const sqlQuery = `UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (err) throw err;
        // console.log(res);
        console.log(`${res.affectedRows} record(s) updated`)
    })
})