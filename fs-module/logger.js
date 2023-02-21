const http = require("http");
const fs = require("fs");
const PORT = 8080;

const server = http.createServer((req,res)=>{
    let filename = '';
     writeLog(req.url);
     switch(req.url){
        case '/':
            filename = 'index';
        break;

        case '/home':
            filename = 'home';
        break;

        case '/about':
            filename = 'about';
        break;

        default:
            filename = 'error';
        break;
     }

     res.writeHead(200,{
        "Content-Type":"text/html"
     });

     fs.readFile(`${filename}.html`,"utf8",(err,data)=>{
          if(err ==  null){

            res.write(data);
            res.end();

          }
     })

     
});

server.listen(PORT,()=>{
    //console.log('Server Started in port,'+PORT);
    writeLog('Server was started at'+PORT);
})

function writeLog(action){
    
    let content = `[logged at,${new Date()}] = user performed ${action}.`;
    fs.appendFile("logger.log",content+"\n","utf8",(err)=>{
        if(err ==  null){
            console.log('Written data to log');
        }
    })
}

