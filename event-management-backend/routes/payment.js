
const express = require("express");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const generateTicketPDF = require("../utils/generateTicketPDF");
const Ticket = require("../models/Ticket");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");


router.post("/confirm", async (req, res) => {
  const { email, eventName, numberOfTickets, eventDate } = req.body;

  try {
    const ticketId = Math.floor(100000 + Math.random() * 900000).toString();

    const qrData = `Ticket ID: ${ticketId}\nEvent: ${eventName}\nTickets: ${numberOfTickets}\nEmail: ${email}`;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);
    const qrBuffer = Buffer.from(qrImageDataUrl.split(",")[1], "base64");

    const pdfBuffer = await generateTicketPDF({
      email,
      eventName,
      numberOfTickets,
      eventDate,
      ticketId,
      qrBuffer
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎟️ Your Gilded Gatherings Ticket",
      html: `
        <div style="padding: 30px; background-color: #000000;">
          <div style="padding: 40px; max-width: 600px; margin: auto;">
            <h2 style="color: #e30b5d; font-size: 32px; font-family: sans-serif;">
              🎟️Your Ticket for <span style="color: #d3af47;">${eventName}</span> is Confirmed!
            </h2>
            <p style="color: #fff; font-size: 16px; font-family: sans-serif; line-height: 1.6;">
              Thank you for booking <strong>${numberOfTickets}</strong> ticket(s).<br />
              Your PDF ticket is attached below, and your QR code is shown here:
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <img src="cid:qrcode" alt="QR Code" style="width: 180px;" />
            </div>
            <p style="color: #d3af47; font-weight: bold; font-size: 18px;">– Team Gilded Gatherings</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "ticket.pdf",
          content: pdfBuffer,
        },
        {
          filename: "qrcode.png",
          content: qrBuffer,
          cid: "qrcode"
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    await Ticket.create({ email, eventName, numberOfTickets, eventDate, ticketId });

    res.status(200).json({ message: "🎉 Ticket sent via email and saved!" });
  } catch (error) {
    console.error("❌ Payment confirm error:", error);
    res.status(500).json({ message: "Error generating ticket", error: error.message });
  }
});


router.get("/ticket", async (req, res) => {
  const { email, eventName } = req.query;

  console.log("Searching ticket for:", email, eventName); // <-- Add this

  const ticket = await Ticket.findOne({ email, eventName });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const qrData = `Ticket ID: ${ticket.ticketId}\nEvent: ${ticket.eventName}\nTickets: ${ticket.numberOfTickets}\nEmail: ${ticket.email}`;
  const qrBase64 = await QRCode.toDataURL(qrData);

  res.json({ ticket: { ...ticket.toObject(), qrCodeBase64: qrBase64.split(",")[1] } });
});

//this my is the my tickets one

router.get("/my", authenticate, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const tickets = await Ticket.find({ email: userEmail }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching user tickets:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});





module.exports = router;