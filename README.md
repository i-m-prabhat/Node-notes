# Node js Notes

<a href="./fsModule.md">FS Module</a>

<hr/>
<a href="https://github.com/Vasu7389/JavaScript-Interview-Questions-2023">JavaScript Interview tricky questions</a>
<br/>
<a href="https://github.com/Vasu7389/ReactJs-Interview-Question-2023">React Interview Questions</a>
<br/>
<a href="https://github.com/trekhleb/javascript-algorithms">JavaScript DSA</a>
<br/>
<a href="https://github.com/lydiahallie/javascript-questions">JavaScript interview questions </a>
<br/>
<a href="https://github.com/ryanmcdermott/clean-code-javascript">JavaScript Clean Code </a>
<br/>
<a href="https://github.com/denysdovhan/wtfjs#-and-null-are-objects">funny and tricky JavaScript examples</a>
<br/>
<a href="https://github.com/getify/You-Dont-Know-JS">You Don't Know -JS</a>
<hr/>

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


## Making a Node Module:-

1. module.exports = {} <br/>
2. exports.var = var; <br/>
	   
Note :: module.exports/exports both referes to global empty Object <br/> 
this => {} => global empty Object.<br/>

```
	   module = {exports : {x:10}}
	   module.exports = {x:10}
	   module.exports.x=10
	   
	   var x=10;
	   module = {exports:x}
	   module.exports = x;
```
<br/>
In flexible there is no difference B/w module.exports and exports. <br/>
but in strict mode we cannot use exports directly. <br/>
it is because module is a mendatory, Object in strict mode.
<br/>
but since module refer to this Object.
you can pass varaible in following

```
        1. module.exports = x;
		2. this.exports = x;
		3. exports.x=x;
		   |
		   this => module.
		   
		   exports === module.exports : strict mode : off 
		   exports != module.exports : strict mode : on
```

## Implementation modularity in mvc:-

We know that, <br/>
m => model <br/>
v => view <br/>
c => controller <br/>

It is always better approach, to keep the different Js file with in different associated folder such that modularity of the project can be maintained.
<br/>
StudentModel.js Model suffix => pascal case <br/> 
StudentController.js Controller suffix => pascal case. <br/>
students.js =>view lovwecase suffix. <br/>
            Note :: Template Engine <br/>
                pug : students.pug <br/>
                EJS : student.ejs <br/>
                jade : student.jd  <br/>
                handlebars : student.hbs <br/>
                mustaches : mts  <br/>

These template files on views are called as partials.
                Views  <br/>
                        | partials
                        ....template Engines.
                        <br/>
                        <br/>
                    | layouts
                        index.html,index.js    
<br/>
StudentModel.js
<br/>
data of the Student model => 
<br/>
Api call => student data.

```
var studentModel = {
    students:[
        {
            "id":1001,
            "name": "Prabhat",
            "class": "Btech",
            "stream": "CS"
        },
        {
            "id":1002,
            "name": "virat",
            "class": "Btech",
            "stream": "IT"
        },
        {
            "id":1003,
            "name": "Salmon",
            "class": "BA",
            "stream": "Hindi"
        },
        {
            "id":1004,
            "name": "Akash",
            "class": "MBA",
            "stream": "IT"
        },
    ]
}

module.exports = studentModel
```
StudentController.js
<br/>
``const studentModel = require("./studentModel");``
1. data from model to controller  <br/>

Response Object it must contain <br/>
    1. code : 201 <br/>
    2. data : it can be array or object  [], {} <br/>
    3. status : true or false <br/>
    4. message or comment : "Login Successfull","Oops something, went wrong". <br/>
    5. error : by-default it will be false, if any error error message will be raised <br/>

```
        let response = {};

        try and catch.
        let promise = fetch(url).then().then.catch((error)=>{
            let responseError = error
        });

        JsonResponse = {
            "code" : 404,
            "message" : "Runtime Exception cannot Post data",
            "data" : [],
            "status" : false
            "error" : responseError
        }

        response.writeHead(200,{"Content-Type":"application/json"})
        or
        response.writeHead(200,{"Content-Type":"application/json;Charset=utf-8"})
        response.write(JSON.stringify(JsonResponse));
```


## Generating Pretty JSON Response :-

by default when you will be using express module.
you will get json() method, to print the output in pretty mode.
but we are not using "express" module hence, we need to use JSON.stringify() to print the output in pretty mode.
<br/>
pretty mode in JSON.stringify() :-

```
JSON.stringify({name:"prabhat",class:"Diploma"})
```

output : 
```
    {name:"prabhat",class:"Diploma"}
```
pretty Output :- <br/>
you need to increase padding width or pretty width <br/>
JSON.stringify(object,null,Pwidth) <br/>
Pwidth = 1,2,..................n <br/>
standard : 4 <br/>

```
JSON.stringify({name:"prabhat",class:"Diploma"},null,4)
```
Output :
```
{name:"prabhat",class:"Diploma"}
{
    name:"prabhat",
    class:"Diploma"
}
```
