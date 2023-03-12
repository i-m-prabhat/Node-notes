const express = require('express');

const app = express();

app .listen(8080, ()=>{
    console.log('Server Started.');
});

app.get('/', (req,res)=>{
    res.write("Hello from express");
    res.end();
});