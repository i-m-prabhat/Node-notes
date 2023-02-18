const http = require('http');
const studentController = require('./controller/studentController');
const PORT = 8080;

const server = http.createServer((req,res)=>{

    res.writeHead(200,{"Content-Type":"application/json"});
    res.write(JSON.stringify(studentController.getStudentData(),null,4));
    res.end();
});

server.listen(PORT,()=>{
    console.log("Server Started At PORT = "+PORT);
});


// require('http').createServer((request,response)=>{

//     response.write("Hello world!")
//     response.end();
// }).listen(8080,()=>{
//     console.log("Server started at Port 8080");
// })