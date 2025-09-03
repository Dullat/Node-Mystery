const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose Duplicate Key Error
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for '${Object.keys(
      err.keyValue,
    )}' field. Please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose Cast Error
  if (err.name === "CastError") {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 400;
  }

  // Send response
  return res.status(customError.statusCode).json({
    success: false,
    statusCode: customError.statusCode,
    message: customError.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandlerMiddleware;
