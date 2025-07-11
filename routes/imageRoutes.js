const express = require("express");
const multer = require("multer");
const path = require("path");
const imageController = require("../controller/imageController");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/list/img", imageController.getAllImages);
router.delete("/delete/:id", imageController.deleteImage);

module.exports = router;
