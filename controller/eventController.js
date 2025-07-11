const Event = require("../model/EventModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 1. Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Event"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

const clients = ["TechCorp", "Sharma Family", "StartupXYZ", "Patel Family"];

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Total Events
    const totalEvents = events.length;

    // Total Revenue (assuming `revenue` is stored as number)
    const totalRevenue = events.reduce((sum, e) => sum + (e.revenue || 0), 0);

    // Active Clients (unique client names)
    const activeClients = new Set(events.map((e) => e.client)).size;

    // Venues (you can fetch from venue model if needed, mock here)
    const Venue = require("../model/venueModel");
    const venues = await Venue.find();
    const venueCount = venues.length;

    // Monthly Revenue (last 6 months, dummy logic - improve for real date filtering)
    const monthlyRevenue = [
      { month: "Jan", revenue: 45000 },
      { month: "Feb", revenue: 52000 },
      { month: "Mar", revenue: 48000 },
      { month: "Apr", revenue: 61000 },
      { month: "May", revenue: 55000 },
      { month: "Jun", revenue: 67000 },
    ];

    // Recent Events (last 3)
    const recentEvents = events.slice(-3).reverse().map((event) => ({
      name: event.title,
      client: event.client,
      date: event.date,
      status: event.status,
      revenue: `₹${event.revenue?.toLocaleString() || 0}`,
    }));

    res.status(200).json({
      stats: {
        totalEvents,
        totalRevenue,
        activeClients,
        venues: venueCount,
      },
      recentEvents,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// 2. Create new event with file
exports.createEvent = async (req, res) => {
  try {
    const {
      title, category, imageCount, date, location,
      description, description2, client, duration,
      totalImages, photographer, guests, galleryImages
    } = req.body;

    const newEvent = new Event({
      title,
      category,
      imageCount,
      date,
      location,
      image: req.file ? req.file.filename : "",
      description,
      description2,
      client,
      duration,
      totalImages,
      photographer,
      guests,
      galleryImages: galleryImages ? galleryImages.split(",") : []
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Update event
// exports.updateEvent = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     if (req.file) {
//       updateData.image = req.file.filename;
//     }

//     if (req.body.galleryImages) {
//       updateData.galleryImages = req.body.galleryImages.split(",");
//     }

//     const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    if (req.body.galleryImages) {
      updateData.galleryImages = req.body.galleryImages.split(",");
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Event updated", event: updatedEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// 6. Delete event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
