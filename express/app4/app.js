var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PrabhatRouter = require('./routes/prabhat');

var app = express();

//app4
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// console.log(__dirname+"/views"); // current_folder_path
// console.log(path.join(__dirname,"views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); //resouces
app.use('/prabhat', PrabhatRouter); //resouces

module.exports = app;
