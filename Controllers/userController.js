const db = require("../DB/db.js");

async function createUser(req, res) {
  try {
    const user = await db.insertUser(req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        error: "Username or email already exists",
      });
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function getUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const sortByFields = ["username", "created_at"];
    const sortBy = sortByFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "created_at";
    const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const filter_username = req.query.username;
    const users = await db.fetchUsers(sortBy, order, filter_username, page);
    if (!users) {
      return res.status(404).json({ message: "Users not found!" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
async function removeUser(req, res) {
  try {
    const user = await db.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(204);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function updateBodyInfo(req, res) {
  try {
    const userInfo = await db.updateBodyInfo(req.body, req.params.id);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const queries = Array.isArray(req.query.queries)
      ? req.query.queries
      : [req.query.queries].filter(Boolean);
    const userInfo = await db.fetchUserCols(id, queries);
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
module.exports = {
  createUser,
  getUsers,
  removeUser,
  updateBodyInfo,
  getUser,
};
