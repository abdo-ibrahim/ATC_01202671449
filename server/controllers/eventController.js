const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const Event = require("../models/EventModel");
require("dotenv").config();

// Get Language
const getLanguage = (req) => {
  const lang = req.headers["accept-language"];
  return ["ar", "en"].includes(lang) ? lang : "en";
};

// @desc: Get all events
// @route: /api/v1/events
// @method: GET
// @access: private
exports.getAllEvents = asyncHandler(async (req, res, next) => {
  const lang = getLanguage(req);
  const events = await Event.find();
  if (!events) {
    return next(new AppError("No events found", 404));
  }

  const translatedEvents = events.map((event) => {
    return {
      _id: event._id,
      name: event.name[lang],
      description: event.description[lang],
      category: event.category[lang],
      eventDate: event.eventDate,
      venue: event.venue[lang],
      price: event.price,
      imageUrl: event.imageUrl,
    };
  });

  res.status(200).json({
    status: "success",
    results: translatedEvents.length,
    data: {
      events: translatedEvents,
    },
  });
});
// @desc: Create a new event
// @route: /api/v1/events
// @method: POST
// @access: private
exports.createEvent = asyncHandler(async (req, res) => {
  const lang = getLanguage(req);

  const { name, description, category, eventDate, venue, price, imageUrl } = req.body;
  if (!name || !description || !category || !eventDate || !venue || !price) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const eventData = {
    name: {
      en: name.en,
      ar: name.ar,
    },
    description: {
      en: description.en,
      ar: description.ar,
    },
    category: {
      en: category.en,
      ar: category.ar,
    },
    eventDate,
    venue: {
      en: venue.en,
      ar: venue.ar,
    },
    price,
    imageUrl,
    createdBy: req.user._id,
  };
  const event = await Event.create(eventData);
  const translatedEvent = {
    _id: event._id,
    name: event.name[lang],
    description: event.description[lang],
    category: event.category[lang],
    eventDate: event.eventDate,
    venue: event.venue[lang],
    price: event.price,
    imageUrl: event.imageUrl,
  };
  res.status(201).json({
    status: "success",
    data: {
      event: translatedEvent,
    },
  });
});

// @desc: Get event by ID
// @route: /api/v1/events/:id
// @method: GET
// @access: public
exports.getEventById = asyncHandler(async (req, res, next) => {
  const lang = getLanguage(req);
  if (!req.params.id) {
    return next(new AppError("Please provide an event ID", 400));
  }
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  const translatedEvent = {
    _id: event._id,
    name: event.name[lang],
    description: event.description[lang],
    category: event.category[lang],
    eventDate: event.eventDate,
    venue: event.venue[lang],
    price: event.price,
    imageUrl: event.imageUrl,
  };
  res.status(200).json({
    status: "success",
    data: {
      event: translatedEvent,
    },
  });
});

// @desc: Update event by ID
// @route: /api/v1/events/:id
// @method: PUT
// @access: private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  const lang = getLanguage(req);
  if (!req.params.id) {
    return next(new AppError("Please provide an event ID", 400));
  }
  const { name, description, category, eventDate, venue, price, imageUrl } = req.body;
  if (!name || !description || !category || !eventDate || !venue || !price) {
    return next(new AppError("Please provide all required fields", 400));
  }
  const eventData = {
    name: {
      en: name.en,
      ar: name.ar,
    },
    description: {
      en: description.en,
      ar: description.ar,
    },
    category: {
      en: category.en,
      ar: category.ar,
    },
    eventDate,
    venue: {
      en: venue.en,
      ar: venue.ar,
    },
    price,
    imageUrl,
  };
  // Update the event
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, eventData, {
    new: true,
    runValidators: true,
  });
  if (!updatedEvent) {
    return next(new AppError("No event found with that ID", 404));
  }
  const translatedEvent = {
    _id: updatedEvent._id,
    name: updatedEvent.name[lang],
    description: updatedEvent.description[lang],
    category: updatedEvent.category[lang],
    eventDate: updatedEvent.eventDate,
    venue: updatedEvent.venue[lang],
    price: updatedEvent.price,
    imageUrl: updatedEvent.imageUrl,
  };
  res.status(200).json({
    status: "success",
    data: {
      event: translatedEvent,
    },
  });
});
// @desc: Delete event by ID
// @route: /api/v1/events/:id
// @method: DELETE
// @access: private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide an event ID", 400));
  }
  // Delete the event
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
