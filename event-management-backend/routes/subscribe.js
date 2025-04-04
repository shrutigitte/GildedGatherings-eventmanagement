const express = require("express");
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: "Already subscribed." });

    const newSub = new Subscriber({ email });
    await newSub.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscribed to Gilded Gatherings!",
      html: `
  <div style="padding: 30px; margin: 44px; background-color: #000000;">
    <div style="padding: 40px; margin: 40px;">
      <h3 style="color: #e30b5d; padding: 16px; font-weight: bold; font-size: 48px; font-family: sans-serif;">
        Thank You for subscribing to <br>
        <span style="color: #d3af47;">Gilded Gatherings</span>
      </h3>

      <p style="padding: 40px; color: #ffffff; font-size: 16px; font-family: sans-serif; line-height: 1.5;">
        Welcome to the Gilded Gatherings family! We're absolutely thrilled you're here.
        Get ready to embark on a journey of unforgettable moments, where elegance meets warmth.
        Think twinkling lights, shared laughter, and exquisitely crafted experiences.

        We believe in creating connections that shimmer, just like our name.
        We're passionate about turning your event dreams into golden realities.

        Stay tuned for glimpses into our world of curated gatherings, expert tips,
        and a community that celebrates life's beautiful moments. We can't wait to get to know you better!
      </p>

      <p style="padding: 40px; color: #d3af47; font-weight: 600; font-size: 24px; font-family: sans-serif;">
        - Team Gilded Gatherings
      </p>
    </div>
  </div>
  `
    });

    res.status(200).json({ message: "Subscribed successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing.", error: err.message });
  }
});

module.exports = router;
