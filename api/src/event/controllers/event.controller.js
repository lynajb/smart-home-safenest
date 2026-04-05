const eventController = require("../services/event.services");

const createEventController = async (req, res, next) => {
  try {
    const { eventId, eventType, timestamp, payload } = req.body;
    const event = await eventController.createEvent(
      eventId,
      eventType,
      timestamp,
      payload
    );
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const getEventsController = async (req, res, next) => {
  try {
    const result = await eventController.getEvents();
    if (!result) {
      return res.status(500).json({ error: "Oops something went wrong !!!" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getEventByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const result = await eventController.getEventById(id);
    if (!result) {
      return res.status(404).json({ message: "No Event Found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEventController,
  getEventsController,
  getEventByIdController,
};
