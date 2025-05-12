const express = require("express");

const router = express.Router();
const baseURL = "/api/v1";

const authRouter = require("./api/authRoutes");
const eventRouter = require("./api/eventRoutes");
const bookingRouter = require("./api/bookingRoutes");

router.use(`${baseURL}/events`, eventRouter);
router.use(`${baseURL}/bookings`, bookingRouter);
router.use(`${baseURL}/auth`, authRouter);

module.exports = router;
