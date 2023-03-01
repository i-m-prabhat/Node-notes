const mysql = require("mysql");
const config = require("./config/config.json")
const connection = mysql.createConnection(config.dbcofig.mysql);
try {
    connection.connect();

    createStudent(connection,"king","Btech","80");
    // createStudent(connection,"rohit","BA","60");
    // createStudent(connection,"rahul","MBA","60");

} catch (error) {
    console.log('Connection Error',error);
}

connection.end();

function createStudent(connection,name,clss,marks){

    let sql = `INSERT INTO student(name,class,marks) values('${name}','${clss}','${marks}')`;
    connection.query(sql,(error,result)=>{
        if (error==null) {
            console.log('data inserted Successfully','Inserted Id ='+result.insertId);
        }
    })
}