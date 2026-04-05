const commandService = require("../service/led.command.service");

const sendLedCommandController = async (req, res) => {
  const { state } = req.body;

  if (state !== "on" && state !== "off") {
    return res.status(400).json({ error: "Invalid state" });
  }

  try {
    const response = await commandService.sendLedCommand(state);
    res.status(200).json({ message: `LED turned ${state}`, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendLedCommandController,
};
