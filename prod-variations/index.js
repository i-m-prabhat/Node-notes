const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const variationRoute = require('./routes/variationRoute');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/prod-variations', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api', variationRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`);
});
