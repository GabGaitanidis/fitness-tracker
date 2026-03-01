class AppError extends Error {
  constructor(message, statusCode) {
    // fix typo in parameter name and pass correct value to Error
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
