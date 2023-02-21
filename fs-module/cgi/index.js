const http = require('http');
const PORT = 8080;
const fs = require('fs');

const server = http.createServer((req, res) => {

    res.writeHead(200,{"Content-Type":"text/html"});

    if(req.url == "/"){

        fs.readFile("p1.html", "utf-8", (err, data) => {
            if (err == null) {
                res.write(data);
                res.end();
            }
        });
    }else if(req.url.startsWith("/addNumber")){
        
        let query = req.url.split("?"); //addNumber?a=10&b=30
        let endPoint = query[0]; //a=10&b=30
        let data = query[1];
        let param1 = data.split("&"); //a=10 and b=30
        let a = param1[0].split("=")[1]; //a and 10
        let b = param1[1].split("=")[1]; //b and 30

        res.write(JSON.stringify(Number(a)+Number(b)));
        res.end();
    }  
})

server.listen(PORT, () => {
    console.log("server started!")
})
