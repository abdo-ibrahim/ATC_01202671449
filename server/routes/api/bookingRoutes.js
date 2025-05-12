const express = require("express");
const { protect } = require("../../controllers/authController");
const { getAllBookings, deleteBooking, createBooking, getBookingById } = require("../../controllers/bookingController");

const bookingRouter = express.Router();
bookingRouter.get("/getAllBookings", protect, getAllBookings);
bookingRouter.post("/createBooking", protect, createBooking);
bookingRouter.get("/getBookingById/:id", protect, getBookingById);
bookingRouter.delete("/deleteBooking/:id", protect, deleteBooking);
module.exports = bookingRouter;
