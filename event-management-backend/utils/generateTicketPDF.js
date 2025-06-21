
const axios = require("axios");
const PDFDocument = require("pdfkit");

const generateTicketPDF = async (ticket, qrImageDataURL) => {
  try {
    const doc = new PDFDocument({ size: "A4", margin: 0 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    const endPromise = new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(buffers)));
    });

    // Full black background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");

    let currentY = 40;

    // Title
    doc
      .fillColor("#d3af47")
      .fontSize(28)
      .text("Gilded Gatherings", 0, currentY, {
        align: "center",
        width: doc.page.width,
      });

    currentY += 40;

    // Load and draw the event image
    if (ticket.image) {
      try {
        const imageRes = await axios.get(ticket.image, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(imageRes.data, "binary");

        doc.image(imageBuffer, 50, currentY, {
          width: doc.page.width - 100,
          height: 180,
          align: "center",
          valign: "center",
          fit: [doc.page.width - 100, 180],
        });

        currentY += 200; // Shift down after image
      } catch (err) {
        console.error("Failed to load event image:", err.message);
        currentY += 20;
      }
    }

    // Ticket details and QR side-by-side
    const leftX = 50;
    const rightX = doc.page.width / 2 + 30;

    // Ticket details
    doc
      .fillColor("#e30b5d").fontSize(16).text(`Event: ${ticket.eventName}`, leftX, currentY)
      .fillColor("#ffffff").fontSize(14).text(`Email: ${ticket.email}`, leftX, currentY + 24)
      .text(`Tickets: ${ticket.numberOfTickets}`, leftX, currentY + 48)
      .text(`Date: ${ticket.eventDate || "Not Provided"}`, leftX, currentY + 72)
      .text(`Ticket ID: ${ticket.ticketId}`, leftX, currentY + 96);

    // QR Code
    if (qrImageDataURL && qrImageDataURL.startsWith("data:image")) {
      const base64Data = qrImageDataURL.split(",")[1];
      const qrBuffer = Buffer.from(base64Data, "base64");

      doc.image(qrBuffer, rightX, currentY + 20, {
        width: 120,
        height: 120,
      });
    } else {
      doc.fillColor("red").fontSize(12).text("QR Code Unavailable", rightX, currentY + 50);
    }

    // Move down after details and QR
    currentY += 160;

    // Footer Instructions
    doc
      .fillColor("#d3af47")
      .fontSize(16)
      .text("Instructions", leftX, currentY);

    const instructions = `1. Arrive 30 minutes early for checks.\n2. Entry requires QR or printed ticket.\n3. Prohibited items: weapons, outside food, large bags.\n4. Respect staff instructions.\n5. No re-entry after exit.`;

    doc
      .fillColor("#FFFFFF")
      .fontSize(10)
      .text(instructions, leftX, currentY + 30, {
        width: doc.page.width - 100,
        align: "left",
        lineGap: 4,
      });

    doc.end();

    return await endPromise;
  } catch (err) {
    throw err;
  }
};

module.exports = generateTicketPDF;
