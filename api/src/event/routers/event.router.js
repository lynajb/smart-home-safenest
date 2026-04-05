const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.get('/all',eventController.getEventsController);
router.get('/one/:id',eventController.getEventByIdController);
router.post('/create',eventController.createEventController);

module.exports = router; 