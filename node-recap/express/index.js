const express = require('express');
const path = require('path')
const app = express()
const port = process.env.PORT || 8080;


//custom middleware
const prabhatmiddleware = (req, res, next) =>
{
    console.log(req.url);
    next();
}
// app.use(prabhatmiddleware);

//middleware
app.use(express.static(path.join(__dirname, 'public')));


app.get('/new', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/home/:name', (req, res) =>
{
    res.send(`<h1>Hello ${req.params.name} </h1>`);

})
app.get('/about', (req, res) =>
{
    // res.send("This is About Page");
    res.json({ "name": "Prabhat Patel" })
})

app.listen(port, () =>
{
    console.log(`Server Starting on PORT ${port}`)
})