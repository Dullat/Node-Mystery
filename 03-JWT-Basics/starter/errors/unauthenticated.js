const CustomAPIError = require("./custom-error.js");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
