const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    variations: [
        {
            typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariationType' },
            nameId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariationName' },
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
