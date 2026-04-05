const axios = require("axios");

const esp8266Ip = "http://192.168.1.94";

const sendLedCommand = async (state) => {
  try {
    const response = await axios.get(`${esp8266Ip}/led`, {
      params: { state: state },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to communicate with ESP8266");
  }
};

module.exports = {
  sendLedCommand,
};
