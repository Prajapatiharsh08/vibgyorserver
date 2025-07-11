const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);
