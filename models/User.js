const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email : String,
    phone : Number,
    grade: String
});

module.exports = mongoose.model('User',UserSchema);