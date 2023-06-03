const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;


const Blogrouter = require('./routes/blog')

app.use(express.static(path.join(__dirname, 'static')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(Blogrouter);






app.listen(port, () =>
{
    console.log(`Server Started On PORT ${port}`)
})