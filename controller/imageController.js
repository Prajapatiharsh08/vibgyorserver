const Image = require("../model/imageModel");
const fs = require("fs");
const path = require("path");

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    const image = new Image({
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
    });

    await image.save();

    res.status(201).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join(__dirname, "..", image.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete file from filesystem
    }

    await Image.findByIdAndDelete(req.params.id); // Remove from DB

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};
