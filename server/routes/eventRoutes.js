const express = require('express');
const { createEvent, getEvents, registerForEvent, getEventAttendees } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', getEvents);
router.post('/:id/register', protect, registerForEvent);
router.get('/:id/attendees', getEventAttendees);

module.exports = router;