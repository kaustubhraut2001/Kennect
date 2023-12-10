const mongoose = require("mongoose");

const comments = new mongoose.Schema({
    postid: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },




});

module.exports = mongoose.model("Comments", comments);