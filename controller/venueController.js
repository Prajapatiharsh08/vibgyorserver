const Venue = require("../model/venueModel");
const multer = require("multer");
const path = require("path");

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/venue");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

// Create
exports.createVenue = async (req, res) => {
  try {
    const { title, category, location, description } = req.body;
    const image = req.file ? req.file.filename : "";

    const newVenue = new Venue({
      title,
      category,
      location,
      description,
      image,
    });

    await newVenue.save();
    res.status(201).json({ message: "Venue created successfully", venue: newVenue });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All
exports.getAllVenue = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get By ID
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateVenue = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Venue updated successfully", venue: updatedVenue });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
exports.deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
