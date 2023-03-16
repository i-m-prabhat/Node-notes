const express = require('express');
const app = express();
const homeRoute = require("./routes/index")


app.use("/", homeRoute)
app.use("/user", homeRoute)

module.exports = app;