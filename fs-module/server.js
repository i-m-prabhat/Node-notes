const http = require('http');
const PORT=8080;
const fs = require("fs");


const server = http.createServer((request,response)=>{
    // console.log(request);

    switch(request.url){
        case '/':
            filename = 'index'
        break;
        case '/about':
            filename = 'about'
        break;
        default:
            filename = 'error'
        break;
    }

    response.writeHead(200,{"Content-Type":"text/html"});
    fs.readFile(`${filename}.html`,"utf-8",function(err,data){
        if(err==null){
            response.write(data);
            response.end(); 
        }else{
            console.log("Can't Read File, Please Try Again");
        }
    })   
});

server.listen(PORT,function(){
    console.log('Server Started at PORT ='+PORT);
});