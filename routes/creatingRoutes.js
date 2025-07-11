// const express = require("express");
// const router = express.Router();
// const creatingController = require("../controller/creatingController");

// // Routes
// router.post("/", creatingController.upload.array("images", 10), creatingController.createCreating);

// router.get("/", creatingController.getAllCreating);
// router.get("/:id", creatingController.getCreatingById);
// router.put("/:id", creatingController.upload.array("images", 10), creatingController.updateCreating);
// router.delete("/:id", creatingController.deleteCreating);

// module.exports = router;
const express = require("express");
const router = express.Router();
const creatingController = require("../controller/creatingController");

// Multer middleware for handling image1 and image2 fields
router.post("/", creatingController.upload, creatingController.createCreating);
router.get("/", creatingController.getAllCreating);
router.get("/:id", creatingController.getCreatingById);
router.put("/:id", creatingController.upload, creatingController.updateCreating);
router.delete("/:id", creatingController.deleteCreating);

module.exports = router;