class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const ErrorMessages = {
  serviceUnavailable: new CustomError("Service is currently unavailable", 400),
  serviceNotFound: new CustomError("Service not found", 400),
  noAuthTokenProvided: new CustomError("No authentication token provided", 400),
};

module.exports = { CustomError, ErrorMessages };
