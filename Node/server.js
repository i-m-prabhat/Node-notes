const http = require("http");
const PORT = 8080;

const dataControl=(req,res)=>{

    res.write("<h1>Hi This is Prabhat Patel</h1>")
    res.end();
};

http.createServer(dataControl).listen(PORT,()=>{
    console.log("Server Started at PORT "+PORT);
})