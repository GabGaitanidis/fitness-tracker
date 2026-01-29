const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
};
