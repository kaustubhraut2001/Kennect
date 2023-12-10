const mongoose = require("mongoose");

const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,

});

module.exports = mongoose.model("User", User);