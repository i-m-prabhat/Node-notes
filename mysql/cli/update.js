const mysql = require("mysql");
const config = require("./config/config.json")
const connection = mysql.createConnection(config.dbcofig.mysql);
try {
    connection.connect();

   updateStudent(connection,'92','6');

} catch (error) {
    console.log('Connection Error',error);
}

connection.end();

function updateStudent(connection,marks,id){

    let sql = `Update student set marks='${marks}' where id='${id}'`;
    connection.query(sql,(error,result)=>{
        if(error == null){
        //   console.log('data updated successfully','Inserted Id ='+result.insertId);
          console.log('data updated successfully','Affected Rows Id ='+result.affectedRows);
        }
    })
}