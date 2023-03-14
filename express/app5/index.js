// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || '8080';

// app.listen(PORT, ()=>{
//     console.log(`Server Started on PORT ${PORT}`)
// });

// app.get('/', (req,res)=>{
//     res.send("Hello from Express");
//     res.send("Hello from Express");
// })

// app.get('/users', (req,res)=>{
//     res.write("Hello from Express Users");
//     res.end();
// })

// Updated version

const http= require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || '8080';

server.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})