const Creating = require("../model/creatingModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Multer Setup with .fields for two specific image fields
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/creating");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ✅ Use .fields to handle named fields `image1` and `image2`
exports.upload = multer({ storage }).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
]);

// ✅ CREATE
exports.createCreating = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCreating = new Creating({
      title,
      description,
      images: req.files?.image1?.[0]?.filename || "",
      image: req.files?.image2?.[0]?.filename || "",
    });

    await newCreating.save();
    res.status(201).json({ message: "Creating added", data: newCreating });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ GET ALL
exports.getAllCreating = async (req, res) => {
  try {
    const creatings = await Creating.find().sort({ createdAt: -1 });
    res.status(200).json(creatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET BY ID
exports.getCreatingById = async (req, res) => {
  try {
    const creating = await Creating.findById(req.params.id);
    if (!creating)
      return res.status(404).json({ message: "Creating not found" });
    res.status(200).json(creating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE
exports.updateCreating = async (req, res) => {
  try {
    const creating = await Creating.findById(req.params.id);
    if (!creating) {
      return res.status(404).json({ message: "Creating not found" });
    }

    const { title, description } = req.body;
    const updatedData = { title, description };

    // 🟢 Update image1
    if (req.files?.image1?.[0]) {
      const oldImage1Path = `uploads/creating/${creating.images}`;
      if (creating.images && fs.existsSync(oldImage1Path)) {
        fs.unlinkSync(oldImage1Path);
      }
      updatedData.images = req.files.image1[0].filename;
    } else {
      updatedData.images = creating.images;
    }

    // 🟢 Update image2
    if (req.files?.image2?.[0]) {
      const oldImage2Path = `uploads/creating/${creating.image}`;
      if (creating.image && fs.existsSync(oldImage2Path)) {
        fs.unlinkSync(oldImage2Path);
      }
      updatedData.image = req.files.image2[0].filename;
    } else {
      updatedData.image = creating.image;
    }

    const updatedCreating = await Creating.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({ message: "Creating updated", data: updatedCreating });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ DELETE
exports.deleteCreating = async (req, res) => {
  try {
    const creating = await Creating.findById(req.params.id);
    if (!creating) {
      return res.status(404).json({ message: "Creating not found" });
    }

    // Delete image1
    const file1 = `uploads/creating/${creating.images}`;
    if (creating.images && fs.existsSync(file1)) {
      fs.unlinkSync(file1);
    }

    // Delete image2
    const file2 = `uploads/creating/${creating.image}`;
    if (creating.image && fs.existsSync(file2)) {
      fs.unlinkSync(file2);
    }

    await Creating.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Creating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
