const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
  });

  const thankYouMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for contacting Gilded Gatherings!",
    html: `
    <div style="padding: 30px; background-color: #000000;">
      <div style="padding: 40px; max-width: 600px; margin: auto;">
        <h2 style="color: #e30b5d; font-size: 32px; font-weight: bold; font-family: sans-serif; padding-bottom: 10px;">
          Hi ${name},
        </h2>
        <p style="color: #ffffff; font-size: 16px; font-family: sans-serif; line-height: 1.6;">
          Thank you for reaching out to <span style="color: #d3af47;"><strong>Gilded Gatherings</strong></span>! 💫<br><br>
          We appreciate your message and will get back to you shortly. Our team is here to help turn your dreams into unforgettable golden memories.
        </p>
        <p style="margin-top: 30px; color: #d3af47; font-weight: 600; font-size: 20px;">
          – Team Gilded Gatherings
        </p>
      </div>
    </div>
  `
  };

  const notifyMail = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Contact Submission",
    html: `
    <div style="padding: 30px; background-color: #000000;">
      <div style="padding: 40px; max-width: 600px; margin: auto;">
        <h2 style="color: #e30b5d; font-size: 28px; font-family: sans-serif;">New Contact Form Submission from <span style="color:#d3af47">Gilded Gatherings</span> 📬</h2>
        <p style="color: #ffffff; font-size: 16px; font-family: sans-serif; line-height: 1.6;">
          <strong style="color: #d3af47;">Name:</strong> ${name}<br>
          <strong style="color: #d3af47;">Email:</strong> ${email}<br><br>
          <strong style="color: #d3af47;">Message:</strong><br>${message}
        </p>
      </div>
    </div>
  `
  };

  try {
    await transporter.sendMail(thankYouMail);
    await transporter.sendMail(notifyMail);
    res.status(200).json({ message: "Emails sent!" });
  } catch (err) {
    res.status(500).json({ message: "Error sending email", error: err.message });
  }
});

module.exports = router;
