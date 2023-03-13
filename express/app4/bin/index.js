#!/usr/bin/env node


var app = require('../app');
var debug = require('debug')('app4:server');
var http = require('http');

var port =process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port,()=>{
  console.log("Server Started")
});