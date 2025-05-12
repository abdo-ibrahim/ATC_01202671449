const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const Booking = require("../models/BookingModel");
const Event = require("../models/EventModel");
const User = require("../models/userModel");

// @desc: Get all bookings of a user
// @route: /api/v1/bookings
// @method: GET
// @access: private
exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("event").populate("user", "-password");
  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});
// @desc: Get booking by ID
// @route: /api/v1/bookings/getBookingById/:id
// @method: GET
// @access: private
exports.getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate("event").populate("user", "-password");
  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
// @desc: Create a new booking
// @route: /api/v1/bookings/createBooking
// @method: POST
// @access: private
exports.createBooking = asyncHandler(async (req, res, next) => {
  const { eventId } = req.body;

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  // Check if the user already booked this event
  const existingBooking = await Booking.findOne({ user: req.user._id, event: eventId });
  if (existingBooking) {
    return next(new AppError("You have already booked this event", 400));
  }
  // Create a new booking
  const booking = await Booking.create({
    user: req.user._id,
    event: eventId,
  });
  // Populate the booking with user and event details
  const populatedBooking = await Booking.findById(booking._id).populate("event").populate("user", "-password");
  res.status(201).json({
    status: "success",
    data: {
      booking: populatedBooking,
    },
  });
});

// @desc: delete a booking
// @route: /api/v1/bookings/deleteBooking/:id
// @method: DELETE
// @access: private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
