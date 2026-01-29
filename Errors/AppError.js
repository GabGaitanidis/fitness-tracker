class AppError extends Error {
  constructor(messsage, statusCode) {
    super(messsage);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
