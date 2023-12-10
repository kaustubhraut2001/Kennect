const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        required: false,
    }],


}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);