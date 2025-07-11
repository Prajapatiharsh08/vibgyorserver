const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageCount: Number,
  date: String,
  location: String,
  image: String,
  description: String,
  description2: String,
  client: String,
  duration: String,
  revenue: Number,
  totalImages: Number,
  photographer: String,
  guests: String,
  galleryImages: [String],
});

module.exports = mongoose.model("Event", eventSchema);
