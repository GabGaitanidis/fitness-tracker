const db = require("../DB/db.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");

const createUser = asyncHandler(async (req, res) => {
  try {
    const user = await db.insertUser(req.body);
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    res.status(201).json({ user });
  } catch (err) {
    if (err.code === "23505") {
      throw new BadRequestError("Username or email already exists");
    }
    throw err;
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const sortByFields = ["username", "created_at"];
  const sortBy = sortByFields.includes(req.query.sortBy)
    ? req.query.sortBy
    : "created_at";
  const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const filter_username = req.query.username;

  const users = await db.fetchUsers(sortBy, order, filter_username, page);
  if (!users) {
    throw new NotFoundError("Users not found!");
  }
  res.status(200).json(users);
});

const removeUser = asyncHandler(async (req, res) => {
  const user = await db.deleteUser(req.params.id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }
  res.status(204).send();
});

const updateBodyInfo = asyncHandler(async (req, res) => {
  const userInfo = await db.updateBodyInfo(req.body, req.params.id);
  if (!userInfo) {
    throw new NotFoundError("User not found!");
  }
  res.status(200).json(userInfo);
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const queries = Array.isArray(req.query.queries)
    ? req.query.queries
    : [req.query.queries].filter(Boolean);
  const userInfo = await db.fetchUserCols(id, queries);
  if (!userInfo) {
    throw new NotFoundError("User not found!");
  }
  res.status(200).json(userInfo);
});

module.exports = {
  createUser,
  getUsers,
  removeUser,
  updateBodyInfo,
  getUser,
};
