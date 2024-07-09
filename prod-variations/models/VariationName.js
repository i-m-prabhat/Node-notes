const mongoose = require('mongoose');

// VariationName Schema
const variationNameSchema = new mongoose.Schema({
    name: String,
    variationTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariationType' },
});

const VariationName = mongoose.model('VariationName', variationNameSchema);

module.exports = VariationName;