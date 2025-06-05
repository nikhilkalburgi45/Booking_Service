const express = require("express");
const { BookingController } = require("../../controllers");

const router = express.Router();
const bookingController = new BookingController();

// Booking routes
router.post("/bookings", bookingController.create.bind(bookingController));
router.patch("/bookings/:id", bookingController.update.bind(bookingController));
router.post(
  "/publish",
  bookingController.sendMessageToQueue.bind(bookingController)
);

module.exports = router;
