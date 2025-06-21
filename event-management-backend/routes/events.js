const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { upload } = require("../utils/cloudinary");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Fetch single event by ID
router.get("/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (err) {
      console.error("GET /:id error:", err);
      res.status(500).json({ error: "Invalid ID format or server error" });
    }
  });



router.post('/api/events', async (req, res) => {
  try {
    console.log("Received body:",req.body );
    const { name, date, description, image, venue, sponsors, testimonials, cancellationPolicy ,ticketPrice } = req.body;

    const newEvent = new Event({
      name,
      date,
      description,
      image,
      venue,
      sponsors,
      testimonials,
      cancellationPolicy,
      ticketPrice,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



router.post("/upload", upload.single("image"), async (req, res) => {
    try {
      const { name, date, description, popularity } = req.body;
      const image = req.file.path; // Cloudinary URL
  
      const newEvent = new Event({
        name,
        date,
        description,
        image,
        popularity,
      });
  
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Event upload failed" });
    }
  });
module.exports = router;
