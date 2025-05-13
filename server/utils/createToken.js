const jwt = require("jsonwebtoken");
// Create a JWT token with user's id and save it as a cookie
const createToken = (res, user) => {
  // Create a JWT token
  const token = jwt.sign({ id: user._id, name: user.name, role: user.role || "user" }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  // Configure the options for the cookie
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
};

  // Save the token in a cookie
  res.cookie("token", token, cookieOptions);

  return token;
};

module.exports = createToken;
