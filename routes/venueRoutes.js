const express = require("express");
const router = express.Router();
const venueController = require("../controller/venueController");

router.post("/", venueController.upload.single("image"), venueController.createVenue);
router.get("/", venueController.getAllVenue);
router.get("/:id", venueController.getVenueById);
router.put("/:id", venueController.upload.single("image"), venueController.updateVenue);
router.delete("/:id", venueController.deleteVenue);

module.exports = router;
