class AppError extends Error{

    constructor(
        name,   
        message,
        explanation,
        statusCodes
    ){
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCodes;
    }
}

module.exports = AppError;

