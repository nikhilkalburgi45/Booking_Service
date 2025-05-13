const { Booking } = require("../models/index");
const { AppError } = require("../utils/errors");
const { ValidationError } = require("../utils/errors/valideation-error");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "Cannot create booking",
        "There might be a problem with the data sent in the request",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(id) {
    try {
      const booking = await Booking.findByPk(id);
      if (!booking) {
        throw new AppError(
          "Not Found",
          "Booking not found",
          "The booking you are trying to fetch does not exist",
          StatusCodes.NOT_FOUND
        );
      }
      return booking;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "Repository Error",
        "Cannot fetch booking",
        "There was an error while fetching the booking",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id, data) {
    try {
      const booking = await Booking.findByPk(id);
      if (!booking) {
        throw new AppError(
          "Not Found",
          "Booking not found",
          "The booking you are trying to update does not exist",
          StatusCodes.NOT_FOUND
        );
      }
      await booking.update(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "Repository Error",
        "Cannot update booking",
        "There might be a problem with the data sent in the request",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
