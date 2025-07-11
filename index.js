require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const connectDB = require('./controller/db');
const imageRoutes = require("./routes/imageRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes.js");
const contactRoutes = require('./routes/contactRoutes.js');
const eventRoutes = require("./routes/eventRoutes");
const venueRoutes = require("./routes/venueRoutes");
const Form = require('./model/Form.js');
const userRoutes = require("./routes/userRouter.js");
const subscriptionRoutes = require('./routes/subscriptionRoutes.js');
const creatingRoutes = require("./routes/creatingRoutes");


const categoryRoutes = require("./routes/categoryRoutes.js");
const formRoutes = require("./routes/formRoutes.js");

const app = express();
const PORT = process.env.PORT || 5100;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000","https://vibgyorevent123.netlify.app" , "http://localhost:9000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/testimonials", testimonialRoutes); 
app.use("/api/images", imageRoutes); 
app.use('/api', contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/forms", formRoutes);
app.use('/api', subscriptionRoutes);
app.use("/api/creating", creatingRoutes);
// // Home route
// app.get('/', (req, res) => {
//   res.send("API is working");
// });

// Form submission route
app.post('/api/forms', async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received form data:", formData);
    const newForm = new Form(formData);
    const savedForm = await newForm.save();
    res.status(201).json({
      message: "Form submitted successfully",
      form: savedForm
    });
  } catch (error) {
    console.error("Error saving form:", error.message);
    res.status(500).json({ message: "Error submitting form" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
