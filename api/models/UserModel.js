const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");

var usersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true, minlength: 3},
    lastName: {type: String, required: true, minlength: 3},
    profile: {
        picture: String,
        gender: String,
        address: String,
        city: String,
        state: String,
        country: String,
        birthday: String,
        about: String
    }
},
{
    versionKey: false
});


const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;