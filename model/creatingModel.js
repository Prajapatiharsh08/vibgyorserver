const mongoose = require("mongoose");

const CreatingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Creating", CreatingSchema);
