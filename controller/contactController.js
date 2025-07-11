const Form = require("../model/contactModel.js");

exports.submitForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit form", error: err.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch forms", error: err.message });
  }
};
exports.deleteForm = async (req, res) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete form", error: err.message });
  }
};