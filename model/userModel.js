const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "A User must give his fullname"]
    },
    email: {
        type: String,
        required: [true, "A User must give his email"]
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("users", userSchema);
module.exports = User;