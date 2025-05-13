const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const Booking = require("../models/BookingModel");
const Event = require("../models/EventModel");
const User = require("../models/userModel");

// Get Language
const getLanguage = (req) => {
  const lang = req.headers["accept-language"];
  return ["ar", "en"].includes(lang) ? lang : "en";
};
// @desc: Get all bookings of a user
// @route: /api/v1/bookings
// @method: GET
// @access: private
exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const lang = getLanguage(req);
  const bookings = await Booking.find({ user: req.user._id }).populate("event").populate("user", "-password");
  if (!bookings) {
    return next(new AppError("No bookings found", 404));
  }

  const translatedBookings = bookings.map((booking) => {
    return {
      _id: booking._id,
      event: {
        _id: booking.event._id,
        name: booking.event.name[lang],
        description: booking.event.description[lang],
        category: booking.event.category[lang],
        eventDate: booking.event.eventDate,
        venue: booking.event.venue[lang],
        price: booking.event.price,
        imageUrl: booking.event.imageUrl,
      },
      user: {
        _id: booking.user._id,
        name: booking.user.name,
        role: booking.user.role,
      },
    };
  });

  res.status(200).json({
    status: "success",
    results: translatedBookings.length,
    data: {
      bookings: translatedBookings,
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
  const lang = getLanguage(req);

  const { eventId } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  const existingBooking = await Booking.findOne({ user: req.user._id, event: eventId });
  if (existingBooking) {
    return next(new AppError("You have already booked this event", 400));
  }
  const booking = await Booking.create({
    user: req.user._id,
    event: eventId,
  });

  const populatedBooking = await Booking.findById(booking._id).populate("event").populate("user", "-password");

  const translatedBooking = {
    _id: populatedBooking._id,
    event: {
      _id: populatedBooking.event._id,
      name: populatedBooking.event.name[lang],
      description: populatedBooking.event.description[lang],
      category: populatedBooking.event.category[lang],
      eventDate: populatedBooking.event.eventDate,
      venue: populatedBooking.event.venue[lang],
      price: populatedBooking.event.price,
      imageUrl: populatedBooking.event.imageUrl,
    },
    user: {
      _id: populatedBooking.user._id,
      name: populatedBooking.user.name,
    },
  };
  res.status(201).json({
    status: "success",
    data: {
      booking: translatedBooking,
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
