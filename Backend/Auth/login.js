const jwt = require("jsonwebtoken");
const fetchUser = require("../DB/db").fetchUser;
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await fetchUser(username);
  if (!user) {
    return res.status(401).json({ msg: "invalid username" });
  }

  if (!(user.password == password)) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  const secret = process.env.JWT_SECRET || "secret";
  const { password: pwd, ...payload } = user;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true, // Prevents JS access
    secure: false, // Only sends over HTTP
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7200000,
    path: "/",
  });
  res.json({ message: "Login successful!", token });
};

module.exports = login;
