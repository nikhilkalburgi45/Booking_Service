const { bookingService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log("from booking controller",response);
    return res.status(StatusCodes.CREATED).json({
      message: "Booking created successfully",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    console.log("from booking controller",error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Something went wrong",
      success: false,
      error: error.explanation || {},
      data: {},
    });
  }
};

module.exports = {
  create,
};
