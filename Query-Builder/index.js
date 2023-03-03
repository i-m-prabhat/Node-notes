const http = require('http');
const app = require("./App")
const server = http.createServer(app);
server.listen(8080,()=>{
    console.log("Server Started At PORT 8080");
})