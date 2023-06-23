const mysql = require('mysql');


const Connection = mysql.createConnection({
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "",
    "database": "appwork"
});

Connection.connect((err) =>
{
    if (!err)
    {
        console.log("Database Connection created");
    } else
    {

        console.log(`can't connect to database right now: ${err}`);
    }
});