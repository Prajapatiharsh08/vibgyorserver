const User = require("../model/userModel");
const sendMail = require("../utils/mailer");

let currentOTP = "";
let currentEmail = "";

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  currentEmail = email;
  currentOTP = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendMail(email, currentOTP);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (email === currentEmail && otp === currentOTP) {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ message: "Login successful", userName: user.username });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};
