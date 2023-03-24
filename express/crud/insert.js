var mongoose = require("mongoose");
// creting interface 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Create Schema
var ProductSchema = new mongoose.Schema(
    { id: Number, name: String, price: String, qty: Number, brand: String },
    { versionKey: false }
);
var ProductModel = mongoose.model("Model", ProductSchema, "products");

// var product = {
//     id: "",
//     name: "",
//     price: "",
//     qty: "",
//     brand: ""
// }

// Dynamic Input:- 
readline.question("Enter Your Product Id:", (id) =>
{
    // product.id = id;
    readline.question("Enter Your Product Name:", (name) =>
    {
        // product.name = name;
        readline.question("Enter Your Product Price:", (price) =>
        {
            // product.price = price;
            readline.question("Enter Your Product Quantity:", (qty) =>
            {
                // product.qty = qty;
                readline.question("Enter Product Brand Name:", (brand) =>
                {
                    // product.brand = brand;
                    readline.close();

                    // var products = new ProductModel(product);
                    var products = new ProductModel({
                        id: id,
                        name: name,
                        price: price,
                        qty: qty,
                        brand: brand
                    });
                    mongoose.connect("mongodb://0.0.0.0:27017/ecommerce", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });

                    //How to Insert the Record
                    products.save(function (error, data)
                    {
                        if (error == null)
                        {
                            console.log(data);

                        } else
                        {
                            console.log("Exception Occured...", error);
                        }
                        mongoose.disconnect();
                    });

                });
            });
        });
    });
});

// var products = new ProductModel({ id: 1004, name: "pen", price: "6.00", qty: 100, brand: "Writo Miter" });
