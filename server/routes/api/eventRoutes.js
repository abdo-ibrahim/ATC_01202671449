const express = require("express");
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require("../../controllers/eventController");
const { protect } = require("../../controllers/authController");
const eventRouter = express.Router();

// Middleware to protect routes
const { allowTo } = require("../../middlewares/allowTo");

// Routes for events
eventRouter.get("/getAllEvents", getAllEvents);
eventRouter.post("/createEvent", protect, allowTo("admin"), createEvent);
eventRouter.get("/getEventById/:id", getEventById);
eventRouter.put("/updateEvent/:id", protect, allowTo("admin"), updateEvent);
eventRouter.delete("/deleteEvent/:id", protect, allowTo("admin"), deleteEvent);

module.exports = eventRouter;
