const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const User = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
// Signup
exports.signup = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    throw new Error("All fields are required", 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = await User.create({
    email,
    name,
    password,
  });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: {
      ...newUser._doc,
      password: undefined,
    },
  });
});
// Login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return next(new AppError("invalid email or password", 401));
  }
  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("invalid email or password", 401));
  }
  // jwt
  const token = createToken(res, user);
  await user.save();
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token: token,
    data: {
      id: user._id,
      name: user.name,
      role: user.role || "user",
    },
  });
});
// Logout
exports.logout = (req, res) => {
  // Clear the JWT token cookie
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};
// Protect route : verify token
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // console.log("Token from cookies:", token);

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists.", 401));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return next(new AppError("Invalid token. Please log in again.", 401));
  }
});
// check if user is logged in
exports.checkAuth = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError("You have to be logged in", 401));
  }
  res.status(200).json({
    success: true,
    message: "User is logged in",
    user: {
      ...user._doc,
      password: undefined,
    },
  });
});
