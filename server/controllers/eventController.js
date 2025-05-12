const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const Event = require("../models/EventModel");
require("dotenv").config();

// @desc: Get all events
// @route: /api/v1/events
// @method: GET
// @access: private
exports.getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find();
  res.status(200).json({
    status: "success",
    results: events.length,
    data: {
      events,
    },
  });
});
// @desc: Create a new event
// @route: /api/v1/events
// @method: POST
// @access: private
exports.createEvent = asyncHandler(async (req, res) => {
  const { name, description, category, eventDate, venue, price, imageUrl } = req.body;
  const event = await Event.create({
    name,
    description,
    category,
    eventDate,
    venue,
    price,
    imageUrl,
    createdBy: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      event,
    },
  });
});

// @desc: Get event by ID
// @route: /api/v1/events/:id
// @method: GET
// @access: public
exports.getEventById = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// @desc: Update event by ID
// @route: /api/v1/events/:id
// @method: PUT
// @access: private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});
// @desc: Delete event by ID
// @route: /api/v1/events/:id
// @method: DELETE
// @access: private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
