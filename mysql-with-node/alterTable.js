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

    const sqlQuery = `ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY`;
    //console.log(sqlQuery);

    connection.query(sqlQuery, (err, result) =>
    {
        if (!err)
        {
            console.log('Table Altered successfully');
        } else
        {
            console.log(err);
        }
    });;
})