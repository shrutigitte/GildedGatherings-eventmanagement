
// const express = require("express");
// const nodemailer = require("nodemailer");
// const QRCode = require("qrcode");

// const router = express.Router();

// router.post("/confirm", async (req, res) => {
//   const { email, eventName, numberOfTickets } = req.body;

//   const qrData = `Event: ${eventName}\nTickets: ${numberOfTickets}\nEmail: ${email}`;
//   const qrImageBuffer = await QRCode.toBuffer(qrData); // use Buffer instead of Data URL

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mail = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Payment Confirmed – Your Entry QR Code 🎟️",
//     html: `
//   <div style="padding: 30px; background-color: #000000;">
//     <div style="padding: 40px; max-width: 600px; margin: auto;">
//       <h2 style="color: #e30b5d; font-size: 32px; font-family: sans-serif; margin-bottom: 20px;">
//         🎟️ Payment Confirmed for <span style="color: #d3af47;">${eventName}</span>
//       </h2>
//       <p style="color: #ffffff; font-size: 16px; font-family: sans-serif; line-height: 1.6;">
//         Thank you for booking <strong>${numberOfTickets}</strong> ticket(s)!<br><br>
//         Below is your QR code. Please present it at the venue for entry. We look forward to creating magical memories with you!
//       </p>
//       <div style="margin: 30px 0; text-align: center;">
//         <img src="cid:qrCodeImage" alt="QR Code" style="width: 200px; height: 200px;" />
//       </div>
//       <p style="color: #d3af47; font-weight: bold; font-size: 20px;">– Team Gilded Gatherings</p>
//     </div>
//   </div>
// `,
//     attachments: [
//       {
//         filename: "qr-code.png",
//         content: qrImageBuffer,
//         cid: "qrCodeImage", // same as in the <img src="cid:..." />
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mail);
//     res.status(200).json({ message: "Payment email with QR sent!" });
//   } catch (err) {
//     console.error("❌ QR email error:", err);
//     res.status(500).json({ message: "Failed to send email", error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const { Readable } = require("stream");

const router = express.Router();

router.post("/confirm", async (req, res) => {
  const { email, eventName, numberOfTickets } = req.body;

  try {
    // 1. Generate QR Code as base64 and buffer
    const qrData = `Event: ${eventName}\nTickets: ${numberOfTickets}\nEmail: ${email}`;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);
    const qrBuffer = Buffer.from(qrImageDataUrl.split(",")[1], "base64");

    // 2. Generate PDF with QR inside
    const pdfDoc = new PDFDocument();
    const pdfChunks = [];
    pdfDoc.on("data", (chunk) => pdfChunks.push(chunk));
    pdfDoc.on("end", async () => {
      const pdfBuffer = Buffer.concat(pdfChunks);

      // 3. Setup email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // 4. Create email with PDF + QR
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎟️ Your Gilded Gatherings Ticket",
        html: `
          <div style="padding: 30px; background-color: #000000;">
            <div style="padding: 40px; max-width: 600px; margin: auto;">
              <h2 style="color: #e30b5d; font-size: 32px; font-family: sans-serif;">
                🎟️ Payment Confirmed for <span style="color: #d3af47;">${eventName}</span>
              </h2>
              <p style="color: #fff; font-size: 16px; font-family: sans-serif; line-height: 1.6;">
                Thank you for booking <strong>${numberOfTickets}</strong> ticket(s).<br>
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
            cid: "qrcode" // Used in <img src="cid:qrcode" />
          }
        ]
      };

      // 5. Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Ticket sent via email!" });
    });

    // Start writing PDF
    pdfDoc.font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#e30b5d")
      .text("Gilded Gatherings Ticket", { align: "center" });

    pdfDoc.moveDown(1);
    pdfDoc.font("Helvetica")
      .fontSize(14)
      .fillColor("#000000")
      .text(`Event: ${eventName}`)
      .text(`Email: ${email}`)
      .text(`Tickets: ${numberOfTickets}`);

    pdfDoc.image(qrBuffer, {
      fit: [150, 150],
      align: "center",
      valign: "center",
      x: 80,
      y: 150
    });

    pdfDoc.end();

  } catch (error) {
    console.error("❌ Payment confirm error:", error);
    res.status(500).json({ message: "Error generating ticket", error: error.message });
  }
});

module.exports = router;
