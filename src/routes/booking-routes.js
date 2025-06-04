const express = require("express");
const { BookingController } = require("../controllers");

// const { createChannel } = require("../utils/messageQueue");
// const channel = await createChannel();

const bookingController = new BookingController();
const router = express.Router();

router.post("/", bookingController.create.bind(bookingController));
router.patch("/:id", bookingController.update.bind(bookingController));
router.post("/publish", bookingController.sendMessageToQueue.bind(bookingController));

module.exports = router;
 