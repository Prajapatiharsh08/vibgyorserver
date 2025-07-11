const Form = require("../model/Form");


// Create form
exports.createForm = async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).json({ message: 'Form submitted successfully', form });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ created_at: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update form
exports.updateForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json({ message: 'Form updated', form });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete form
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
