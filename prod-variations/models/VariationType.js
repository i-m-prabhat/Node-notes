const mongoose = require('mongoose');

// VariationType Schema
const variationTypeSchema = new mongoose.Schema({
    name: String,
});

const VariationType = mongoose.model('VariationType', variationTypeSchema);


module.exports = VariationType;