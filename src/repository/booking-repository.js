const {Booking} = require('../models/index');
const { AppError } = require('../utils/errors');
const {ValidationError,AppError} = require('../utils/errors/valideation-error');
const {StatusCodes} = require('http-status-codes');


class BookingRepository{
    async create(data){
        try{
            const booking = await Booking.create(data);
            return booking;
        }catch(error){
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError('Repository Error', 
                'Cannot create booking', 
                'There might be a problem with the data sent in the request', 
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}   

module.exports = BookingRepository;

