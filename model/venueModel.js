const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  title: String,
  category: String,
  location: String,
  description: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Venue", VenueSchema);
