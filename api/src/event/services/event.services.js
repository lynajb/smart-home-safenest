const {Event} = require("../model/event.model");
const User = require("../../user/model/user.model");

const createEvent = async (eventId, eventType, timestamp, payload) => {
  const result = await Event.create({
    eventId,
    eventType,
    timestamp,
    payload,
  });
  return result;
};

const getEvents = async () => {
  const allEvents = await Event.find();
  return allEvents;
};

const getEventById = async (id) => {
  const event = await Event.findOne({ _id: id });
  return event;
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
};
