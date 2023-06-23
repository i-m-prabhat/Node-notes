const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB"
})

connection.connect((err) =>
{
    if (err) throw err;
    console.log("database connected");

    // const sqlQuery = `INSERT INTO customers (name, address) VALUES ?`;
    // const values = [
    //     ['John', 'Highway 71'],
    //     ['Peter', 'Lowstreet 4'],
    //     ['Amy', 'Apple st 652'],
    //     ['Hannah', 'Mountain 21'],
    //     ['Michael', 'Valley 345'],
    //     ['Sandy', 'Ocean blvd 2'],
    //     ['Betty', 'Green Grass 1'],
    //     ['Richard', 'Sky st 331'],
    //     ['Susan', 'One way 98'],
    //     ['Vicky', 'Yellow Garden 2'],
    //     ['Ben', 'Park Lane 38'],
    //     ['William', 'Central st 954'],
    //     ['Chuck', 'Main Road 989'],
    //     ['Viola', 'Sideway 1633']
    // ];

    // const sqlQuery = `INSERT INTO users (name, favorite_product) VALUES ?`;
    // const values = [
    //     ['John', 154],
    //     ['Peter', 154],
    //     ['Amy', 155],
    //     ['Hannah', 156],
    //     ['Michael', 156]
    // ]

    const sqlQuery = `INSERT INTO products (id,name) VALUES ?`;
    const values =
        [
            [154, 'Chocolate Heaven'],
            [155, 'Tasty Lemons'],
            [156, 'Vanilla Dreams']
        ]
    connection.query(sqlQuery, [values], (err, res) =>
    {
        if (!err)
        {
            console.log("Multiple data inserted");
            console.log(res);
        } else
        {
            console.log(err);
        }
    })
})