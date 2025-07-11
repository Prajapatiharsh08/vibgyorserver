const express = require("express");
const router = express.Router();
const { submitForm, getAllForms,deleteForm } = require("../controller/contactController");

router.post("/contact", submitForm);       
router.get("/contact", getAllForms);       
router.delete("/contact/:id", deleteForm); // <-- ADD this

module.exports = router;
