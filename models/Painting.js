const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PainitingSchema = new Schema({
    name: String,
    url: String,
    techniques: [String]
});

module.exports = mongoose.model('Painting',PainitingSchema);