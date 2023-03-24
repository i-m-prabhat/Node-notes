const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const port = 3000

app.get('/', (req, res) =>
{
    res.send('Hello World!')
})


app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})

const ProductSchema = new mongoose.Schema(
    { id: Number, name: String, price: String, qty: Number, brand: String },
    { versionKey: false }
);

mongoose.connect("mongodb://0.0.0.0:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ProductModel = mongoose.model("Model", ProductSchema, "products");
//find : Array : Collection Object
//findOne : Object

let Products = {}

ProductModel.findOne({ id: 1003 }, (error, data) =>
{
    if (typeof (data) == 'object')
    {
        if (Array.isArray(data))
        {
            console.log("Data is Array of Object ");
            console.log(data)
        } else
        {
            console.log("Data is Object");
            // console.log(data)
            Products = data;
        }
    }
    mongoose.disconnect();
});
app.use('/products', router)
router.get('/find', (req, res, next) =>
{
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.send(JSON.stringify(Products, null, 4));
})