const express = require('express');
const router = express.Router();
const commandController = require('../controller/led.command.controller');

router.post("/led", commandController.sendLedCommandController);

module.exports = router;