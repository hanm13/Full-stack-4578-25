const mongoose = require("mongoose");


let userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 15
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 15
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 15
        },
        password: {
            type: String,
            required: true,
            minlength: 64,
            maxlength: 64
        },
        cart: {
            type: []
        }
    }
);

let UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}


