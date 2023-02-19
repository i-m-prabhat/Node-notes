const http = require('http');
const fs = require('fs');
const PORT = 8080;


const server = http.createServer((req,res)=>{
    
    let filename = '';

    switch(req.url){
      case '/':
         filename = 'index';
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

    fs.readFile(`${filename}.html`,"utf-8",function(err,data){

        if(err==null){
            res.write(data);
            res.end();
        }else{
            console.log(err+'Something went wrong');  
        }
        
    });

   
})

server.listen(PORT,function(){
    console.log("server Started!")
})