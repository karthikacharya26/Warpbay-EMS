const EventModel = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const event = EventModel.create({ title, description, date, location });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEvents = async (req, res) => {
  const { search, page = 1, limit = 5 } = req.query;

  try {
    const query = search ? { title: new RegExp(search, "i") } : {};
    const events = await EventModel.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.attendees.push(req.user.id);
    await event.save();

    return res.status(200).json({ message: "Successfully registered for event" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEventAttendees = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id).populate(
      "attendees",
      "name email"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event.attendees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
