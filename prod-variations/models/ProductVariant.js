const mongoose = require('mongoose');

// ProductVariant Schema
const productVariantSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variations: [
        {
            typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariationType' },
            nameId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariationName' },
        },
    ],
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports = ProductVariant;