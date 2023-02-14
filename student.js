let student = [

    {
        "id": 1,
        "name": "prabhat",
        "class": "Diploma",
        "email": "abc@gmail.com",
        "mobile": "9999999990"
    },
    {
        "id": 2,
        "name": "prabhat",
        "class": "Diploma",
        "email": "abc@gmail.com",
        "mobile": "9999999990"
    },
    {
        "id": 3,
        "name": "prabhat",
        "class": "Diploma",
        "email": "abc@gmail.com",
        "mobile": "9999999990"
    }
];

// const html = require("./index.html");
require('http').createServer((rq, rs) =>
{
    // console.log(student);
    // console.log(jsonData);
    // rs.writeHead(200, { "Content-Type": "application/json" });
    rs.writeHead(200, { "Content-Type": "text/html" });
    // rs.write(JSON.stringify(student));
    rs.write("html");
    // rs.write(JSON.stringify(jsonData));
    rs.end();
}).listen(8080, () =>
{
    console.log("Server Started at port 8080");
})