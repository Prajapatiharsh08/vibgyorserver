const express = require("express");
const router = express.Router();
const {
  registerUser,
  sendOTP,
  verifyOTP
} = require("../controller/userController.js");

router.post("/register", registerUser);
router.post("/mail", sendOTP);
router.post("/verify", verifyOTP);

module.exports = router;
