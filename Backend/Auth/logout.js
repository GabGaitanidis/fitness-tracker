const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  });

  return res.send("Logout!");
};

module.exports = logout;
