#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('app3:server');
var http = require('http');

var port = process.env.PORT || '3000';
app.set('port', port);  //port 1: http or express
var server = http.createServer(app);
server.listen(port, ()=>{
  console.log('Server Started');
})
