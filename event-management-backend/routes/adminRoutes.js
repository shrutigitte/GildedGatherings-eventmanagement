
const express = require("express");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/Ticket");

const router = express.Router();

const Event = require("../models/Event"); // 👈 Import your Event model (make sure you have it!)




// Dummy Admin Credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234567890";

// ✅ Admin Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error("Ticket fetch error:", err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
});


router.get("/dashboard", (req, res) => {
  res.json({ message: "Admin Dashboard Working!" });
});

router.post('/create-event', async (req, res) => {
  try {
    

    const { name, date, venue, description, image, sponsors, testimonials, cancellationPolicy, ticketPrice } = req.body;
    // console.log("Received body:", req.body); 
    const newEvent = new Event({
      name,
      date,
      venue,
      description,
      image,
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

module.exports = router;
