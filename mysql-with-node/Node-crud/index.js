const http = require('http');
const mysql = require('mysql');
const port = 5000;


const mysqlConnection = mysql.createConnection({
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "",
    "database": "appwork"
});

mysqlConnection.connect((err) =>
{
    if (!err)
    {
        console.log("Database Connection created");
    } else
    {

        console.log(`can't connect to database right now: ${err}`);
    }
});

// Insert Query
// mysqlConnection.query(`insert into employee values('king','king@gmail.com','10 Year',10000)`, (err) =>
// {
//     if (!err)
//     {
//         console.log("Record Inserted");
//     } else
//     {
//         console.log(`Error Occured via Inserting Record ${err}`)
//     }
// });

// Update Query
// mysqlConnection.query(`update employee set sallery=8000 where experience='Fresher'`, (err) =>
// {
//     if (!err)
//     {
//         console.log("Record Updated");
//     } else
//     {
//         console.log(`Error Occured via Updating Recard ${err}`)
//     }
// });

// Delete
// mysqlConnection.query(`delete from employee where name='king'`, (err) =>
// {
//     if (!err)
//     {
//         console.log("Record Deleted");
//     } else
//     {
//         console.log(`Error Occured via Deleting Recard ${err}`)
//     }
// });

// select  Query
// mysqlConnection.query(`select * from employee`, (err, data) =>
// {
//     if (!err)
//     {
//         // console.log(data);
//         console.log(JSON.stringify(data));
//     } else
//     {
//         console.log(`Error Occured ${err}`)
//     }
// });

const server = http.createServer((req, res) =>
{
    if (req.url === '/api/employee' && req.method === 'GET')
    {
        const query = 'SELECT * FROM employee';

        mysqlConnection.query(query, (err, results) =>
        {
            if (!err)
            {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(results));
            } else
            {
                console.error('Error retrieving employees:', err);
                res.statusCode = 500;
                res.end('Error retrieving employees');
            }
        });
    } else
    {
        res.write("<h1>Hello from Node Server</h1>");
        res.end();
    }
});

server.listen(port, () =>
{
    console.log(`Server Started on port : ${port}`);
});