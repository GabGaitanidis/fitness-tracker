function checkUserId(userId) {
  if (!userId) {
    throw new UnauthorizedError("User not found!");
  }
}

module.exports = checkUserId;
