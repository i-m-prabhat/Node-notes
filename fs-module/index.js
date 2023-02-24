const http = require('http');
const Port = 8080;
const fs = require('fs');
const query = require('querystring'); //get and post request :data
const server = http.createServer((req,res)=>{
     res.writeHead(200,{
        "Content-Type":"text/html"
     });

     if(req.url == '/login'){
       fs.readFile('login.html',"utf8",(error,data)=>{
         if(error == null){
            res.write(data);
            res.end();
         }
       })

       
     }else if(req.url.startsWith('/submitForm') && req.method=='GET'){
        let q = req.url.split("?")[1];
        console.log(q);
        let params = query.parse(q);
        console.log(params);
        let email = params.email;
        let password = params.password;
        if(typeof(params.submit) == 'undefined'){
            res.writeHead(301,{"Location":"/login"}); //Redirection
        }else{
            
            //res.write('page submitted valid');

            res.write('email ='+email);
            res.write('password = '+password)
            
        }
         res.end();
     }

     

});

server.listen(Port,()=>{
    console.log('server started at Port '+Port);
})