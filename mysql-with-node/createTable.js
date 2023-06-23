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
    console.log(`Connected as id ${connection.threadId}`);

    // const sqlQuery = `create table customers (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), address varchar(255))`;
    const sqlQuery = `create table testTable (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), address varchar(255))`;
    //console.log(sqlQuery);

    connection.query(sqlQuery, (err, result) =>
    {
        if (!err)
        {
            console.log('Table created successfully');
        } else
        {
            console.log(err);
        }
    });;
})