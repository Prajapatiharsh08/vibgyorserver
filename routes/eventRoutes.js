// // routes/eventRoutes.js
// const express = require("express");
// const router = express.Router();

// // Routes
// router.post("/", eventController.createEvent);       
// router.get("/", eventController.getAllEvents);       
// router.get("/:id", eventController.getEventById);    
// router.put("/:id", eventController.updateEvent);     
// router.delete("/:id", eventController.deleteEvent);  

// module.exports = router;



const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController");

router.post("/", eventController.upload.single("image"), eventController.createEvent);
router.put("/:id", eventController.upload.single("image"), eventController.updateEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;