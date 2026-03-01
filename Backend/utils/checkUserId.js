const { UnauthorizedError } = require("../Errors/errors.js");

function checkUserId(userId) {
  // basic guard: make sure middleware/auth set req.user
  if (!userId) {
    // if this is called without a user, treat as unauthorized
    throw new UnauthorizedError("User not found or not authenticated");
  }
}

module.exports = checkUserId;
