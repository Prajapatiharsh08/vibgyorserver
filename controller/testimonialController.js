const Testimonial = require("../model/testimonialModel.js");
const fs = require("fs");

// Get 
exports.getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
};

// Create new
exports.createTestimonial = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const testimonial = await Testimonial.create({ name, email, description, image });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateTestimonial = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const updateData = { name, email, description };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (deleted.image) {
      fs.unlinkSync(`uploads/${deleted.image}`);
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
