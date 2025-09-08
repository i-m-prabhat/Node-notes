const express = require('express');
const routes = require('./routes');

const app = express();

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
{
    console.log(`Worker ${process.pid} running on port ${PORT}`);
});
