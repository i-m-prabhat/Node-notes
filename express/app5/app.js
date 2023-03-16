const express = require('express');
const app = express();
const path = require('path');

const homeRoute = require("./routes/routes")
const indexRoute = require("./routes/index")
const studentRoute = require("./routes/studentRoutes")
const userRoute = require("./routes/userRoutes")

app.use("/", indexRoute);
app.use("/", homeRoute);
app.use("/student", studentRoute);
app.use("/users", userRoute);

//For Handling Error Pages
app.use("*", (req, res, next) =>
{
    res.status(404);
    // res.send("<h1>Page Not Found</h1>")
    let erro_page = path.join(__dirname, "./pages/error.html")
    res.sendFile(erro_page)
});


module.exports = app;