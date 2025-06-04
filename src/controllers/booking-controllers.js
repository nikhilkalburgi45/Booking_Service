const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

const { createChannel, publishMessage } = require("../utils/messageQueue");

const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

class BookingController {
  constructor(channel) {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "success" };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(StatusCodes.OK).json({
      message: "Successfully published the event",
      success: true,
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Booking created successfully",
        success: true,
        error: {},
        data: response,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || "Something went wrong",
          success: false,
          error: error.explanation || {},
          data: {},
        });
    }
  }

  async update(req, res) {
    try {
      const response = await bookingService.updateBooking(
        req.params.id,
        req.body
      );
      return res.status(StatusCodes.OK).json({
        message: "Booking updated successfully",
        success: true,
        error: {},
        data: response,
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || "Something went wrong",
          success: false,
          error: error.explanation || {},
          data: {},
        });
    }
  }
}

module.exports = {
  BookingController
};
