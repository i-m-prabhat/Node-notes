const mysql = require("mysql");
const config = require("./config/config.json")
const connection = mysql.createConnection(config.dbcofig.mysql);


// const connection = mysql.createConnection({
//     host:"localhost",
//     port:"3306",
//     user:"root",
//     password:"",
//     database:"", //no dtatabases selected
// });

try {
    connection.connect();
    console.log('Connection Created Successfully!')

} catch (error) {
    console.log('Connection Error',error);
}

connection.end();