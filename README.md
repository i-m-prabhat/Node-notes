# Node js Notes

<a href="./fsModule.md">FS Module</a>

## How to create a Node server

To crate a node server in Node js we need two things

 1. Request Object : handle client

 2. Response Object : handle server.

 Steps to crete node server:- <br/>
create a file server.js/index.js : : most important file which intialises the server or which set-ups server.

No Application is possible without node-server file.

step1:- <br/>
create const reference for http module. <br>

```
const http = require('http');
```

step2 :- <br/>
using http Object createServer Interface.

```
    http.createServer((request,response)=>{

    });
```

step3:- <br/>
Now set up a port where you want Your server launch.
<br/>
Never use following <br>
    port => 80 => Apache <br>
    port => 3000 => React <br>
    port => 5000 => Django <br>
    Note :: Never use reserved Port

Use other port like 👇🏻 <br/>
    8080 => by-default port.(mostly used) <br/>
    7080 <br/>
    7000<br/>
    const PORT=8080;

```
http.listen(PORT,()=>{
    console.log("Server started successfully at port"+PORT);
});
```

Complete Code 👇🏻
```
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

## How to send Json Response to the Browser

1. You should have a Array of Json Object which can be send as response to server.
2. set the Content-Type : application/json
3. use JSON.stringify() to encode the json to string : Serialization.

Note : : Why we are using JSON.stringify, because of two reasons

1. response.write() only takes string input
2. Browser only Understand text or tag.


Code 👇🏻
```
let student = [

    {
        "id": 1,
        "name": "XYZ",
        "class": "10th",
        "email": "xyz@gmail.com",
        "mobile": "9999999990"
    },
    {
        "id": 2,
        "name": "ABC",
        "class": "12th",
        "email": "abc@gmail.com",
        "mobile": "9999999990"
    },
    {
        "id": 3,
        "name": "Raj",
        "class": "Naam to suna hi hoga",
        "email": "raj@gmail.com",
        "mobile": "9999999990"
    }
];

require('http').createServer((rq, rs) =>
{
    rs.writeHead(200, { "Content-Type": "application/json" });
    rs.write(JSON.stringify(student));
    rs.end();
}).listen(8080, () =>
{
    console.log("Server Started at port 8080");
})
```

## How to send html Response to the Browser :-
```
1. response.writeHead(200,{"Content-Type":"text/html"});
2. response.write("<h1>This is Heading</h1>");
```
Note here is  problem :- <br/>
    You cannot write lot of html code. <br/>
    You can use template string and Write the web-page code
and you can then pass that variable as response to write();

Problem:-
<hr/>
Right now we are writting all data level code and design level code in server.js

data level => model  <br/>
design level => View <br/>
hence we must organise the data in mvc design pattern to follow modular approach.

## Project structure of MVC Node Application:-

Controller <br/>
model <br/>
View <br/>
index.js or server,js <br/>
.env => configuration or Environment variable. <br/>
.gitIgnore <br/>
package.json <br/>
package-lock.json

This project structure is common for all, projects.

controller => folder mkdir <br/>
model => folder mkdir <br/>
view => folder mkdir <br/>
index.js => js file touch <br/>
package.json => npm init -y <br/>
package-lock.json => npm install
 ![mvc](https://user-images.githubusercontent.com/117756490/218751614-d2d6b8c6-a3bb-4ee2-8080-71d31d8e3523.png)

Note : : package.json will install node_modules folder
if any dependencies are added in package.json

& please make use of git bash terminal
