const mongoose = require("mongoose");
const { Schema } = mongoose;

// Base Event Schema
const eventSchema = new Schema(
  {
    eventId: { type: String, required: true, },
    eventType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
  },
  { discriminatorKey: "eventType" },
  { timestamps: true }
);

// Event Model
const Event = mongoose.model("Event", eventSchema);

// Specific Event Schemas
const temperatureRecordedSchema = new Schema({
  payload: {
    sensorId: { type: String, required: true },
    temperature: { type: Number, required: true },
    unit: { type: String, required: true },
  },
});

const humidityRecordedSchema = new Schema({
  payload: {
    sensorId: { type: String, required: true },
    humidity: { type: Number, required: true },
  },
});

const deviceCommandIssuedSchema = new Schema({
  payload: {
    deviceId: { type: String, required: true },
    command: { type: String, required: true },
    parameters: { type: Schema.Types.Mixed },
  },
});

// Discriminators for specific event types
const TemperatureRecorded = Event.discriminator(
  "TemperatureRecorded",
  temperatureRecordedSchema
);
const HumidityRecorded = Event.discriminator(
  "HumidityRecorded",
  humidityRecordedSchema
);
const DeviceCommandIssued = Event.discriminator(
  "DeviceCommandIssued",
  deviceCommandIssuedSchema
);

module.exports = {
  Event,
  TemperatureRecorded,
  HumidityRecorded,
  DeviceCommandIssued,
};
