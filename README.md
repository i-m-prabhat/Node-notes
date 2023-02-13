# Node js Notes
## How to create a HTTP server
To crate a HTTP server in Node js use below command 

```
//wap in node Js to create http server

//http require
const http = require('http');
// port 
const PORT=8080;

//create server using http Object
const server = http.createServer((request,response)=>{

    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("<h1>Hello Coders</h1>")
    response.end();
});

//listen to the port;
server.listen(PORT,function(){
    console.log('Server Started at PORT ='+PORT);
}); //Asynchronous : callback
```

in sort for use below command

```
require('http').createServer((rq,rs)=>{
    rs.write("<h1>Hello Baccho</h1>")
    rs.end();
}).listen(8080,function(){
    console.log("Server Started");
})
```
