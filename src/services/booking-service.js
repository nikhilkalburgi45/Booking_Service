const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestUrl);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking",
          "Cannot book more seats than available"
        );
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      return finalBooking;
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async updateBooking(id, data) {
    try {
      // If updating seats, validate against flight capacity
      if (data.noOfSeats) {
        const booking = await this.bookingRepository.get(id);
        const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        const response = await axios.get(getFlightRequestUrl);
        const flightData = response.data.data;

        // Calculate new total seats after update
        const currentSeats = booking.noOfSeats;
        const newSeats = data.noOfSeats;
        const seatDifference = newSeats - currentSeats;

        if (seatDifference > 0 && seatDifference > flightData.totalSeats) {
          throw new ServiceError(
            "Not enough seats available",
            "Cannot update booking with more seats than available"
          );
        }

        // Update flight seats
        const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(updateFlightRequestUrl, {
          totalSeats: flightData.totalSeats - seatDifference
        });

        // Calculate new total cost
        data.totalCost = flightData.price * newSeats;
      }

      const updatedBooking = await this.bookingRepository.update(id, data);
      return updatedBooking;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError(
        "Cannot update booking",
        "There was an error while updating the booking"
      );
    }
  }
}

module.exports = BookingService;
