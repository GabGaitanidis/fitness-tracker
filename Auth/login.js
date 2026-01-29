const jwt = require("jsonwebtoken");
const fetchUser = require("../DB/db").fetchUser;
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await fetchUser(username);
  if (!user) {
    res.status(401).json({ msg: "invalid username" });
  }

  if (!(user.password == password)) {
    res.status(401).json({ msg: "Invalid password" });
  }

  const token = jwt.sign(user, "secret", { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true, // Prevents JS access (Security!)
    secure: false, // Only sends over HTTPS (use false for localhost)
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7200000,
    path: "/",
  });
  res.json({ message: "Login successful!", token });
};

module.exports = login;
