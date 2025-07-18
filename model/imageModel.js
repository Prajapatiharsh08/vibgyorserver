const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", imageSchema);
