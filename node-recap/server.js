const http = require('http');
const Port = process.env.PORT || 8080;
const server = http.createServer((req, res) =>
{
    if (req.url == '/')
    {
        res.statusCode = 200;
        res.write("<h1>Hello World from Node Js</h1>");
    } else if (req.url == '/about')
    {
        res.statusCode = 200;
        res.write("<h1>About Us</h1>");
    } else
    {
        res.statusCode = 404;
        res.end("<h1>404 not found</h1>")
    }
});

server.listen(Port, () =>
{
    console.log("Server Started On PORT", Port);
})