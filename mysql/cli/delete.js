const mysql = require("mysql");
const config = require("./config/config.json")
const connection = mysql.createConnection(config.dbcofig.mysql);
try {
    connection.connect();

  deleteStudent(connection,[2,4,7]);

} catch (error) {
    console.log('Connection Error',error);
}

connection.end();


function deleteStudent(connection,id_arr){

    let ids = id_arr.join("','") 

    let sql = `delete from student where id in ('${ids}')`;
    console.log(sql);

    connection.query(sql,(error,result)=>{
        if(error == null){
        //   console.log('data deleted successfully','Inserted Id ='+result.insertId);
          console.log('data deleted successfully','Affected Rows Id ='+result.affectedRows);
        }
    })
}