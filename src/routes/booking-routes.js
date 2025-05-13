const express = require("express");
const { bookingController } = require("../controllers");

const router = express.Router();

router.post("/", bookingController.create);
router.patch("/:id", bookingController.update);

module.exports = router; 