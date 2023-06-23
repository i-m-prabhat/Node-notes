const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "testDB"
})

connection.connect((err) =>
{
    if (err) throw err;
    console.log("Connected to MySQL!");

    const sqlQuery = `insert into customers (name, address) VALUES ('Company Inc', 'Highway 37')`;
    connection.query(sqlQuery, (err, res) =>
    {
        if (!err)
        {
            console.log(`Customer inserted successfully!`);
            process.exit();
        } else
        {
            console.log(err);
        }
    })
})