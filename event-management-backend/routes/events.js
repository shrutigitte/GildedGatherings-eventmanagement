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

router.post("/", async (req, res) => {
    try {
      const { name, date, description, image, popularity } = req.body;
  
      const newEvent = new Event({
        name,
        date,
        description,
        image,
        popularity,
      });
  
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error("POST error:", error);
      res.status(500).json({ error: "Failed to create event" });
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
