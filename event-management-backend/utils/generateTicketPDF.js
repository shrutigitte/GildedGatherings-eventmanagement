
// const PDFDocument = require("pdfkit");

// function generateTicketPDF({ email, eventName, numberOfTickets, eventDate, ticketId, qrBuffer }) {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ margin: 40 });
//     const buffers = [];

//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.on("end", () => resolve(Buffer.concat(buffers)));
//     doc.on("error", reject);

//     doc.font("Helvetica-Bold")
//       .fontSize(22)
//       .fillColor("#e30b5d")
//       .text("Gilded Gatherings Ticket", { align: "center" });

//     doc.moveDown(1);

//     const leftX = 40;
//     const rightX = 320;
//     const topY = doc.y;

//     doc.font("Helvetica")
//       .fontSize(16)
//       .fillColor("#d3af47")
//       .text(`Event: ${eventName}`, leftX, topY);

//     doc.font("Helvetica-Bold")
//       .fontSize(14)
//       .fillColor("#d3af47")
//       .text(`Email: ${email}`, leftX, doc.y + 10);

//     doc.font("Helvetica")
//       .fontSize(14)
//       .fillColor("#d3af47")
//       .text(`Tickets: ${numberOfTickets}`, leftX, doc.y + 10);

//     if (eventDate) {
//       doc.font("Helvetica")
//         .fontSize(14)
//         .fillColor("#d3af47")
//         .text(`Date: ${eventDate}`, leftX, doc.y + 10);
//     }

//     doc.font("Helvetica-Bold")
//       .fontSize(14)
//       .fillColor("#d3af47")
//       .text(`Ticket ID: ${ticketId}`, leftX, doc.y + 10);

//     doc.image(qrBuffer, rightX, topY, {
//       fit: [180, 180],
//       align: "right"
//     });

//     doc.moveDown(10);

//     const instructions = `
// Please arrive at least 30 minutes prior to the event start time. This will allow ample time for security checks, ticket verification, and finding your seat.

// For security reasons, the following items are strictly prohibited:
// [e.g., outside food and beverages, weapons of any kind, illegal substances, large bags/backpacks]. A more detailed list may be available on our website.

// Your ticket must be presented (either printed or digitally) for entry. Please have it ready for scanning upon arrival.

// Follow the instructions of event staff and security personnel at all times. They are there to ensure a safe and enjoyable experience for everyone.

// Photography and videography policies:
// [if flash photography is prohibited, and professional equipment requires prior authorization].

// Please be mindful of other attendees and maintain respectful behavior throughout the event.

// In case of an emergency, please locate the nearest event staff member or security personnel for assistance. Emergency exits will be clearly marked.

// No re-entry will be permitted once you have exited the venue. Please ensure you have everything you need with you.

// This ticket is non-transferable and may not be resold. Any attempt to do so may result in the ticket being voided.
//     `;

//     doc.moveDown(2);
//     doc.font("Helvetica")
//       .fontSize(10)
//       .fillColor("#e30b5d");

//     instructions.trim().split("\n").forEach(line => {
//       doc.text(line.trim());
//       doc.moveDown(0.4);
//     });

//     doc.end();
//   });
// }

// module.exports = generateTicketPDF;
const PDFDocument = require("pdfkit");

const generateTicketPDF = (ticket, qrImage) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Styles
      doc.fontSize(16).fillColor("#d3af47").text(`Event: ${ticket.eventName}`, 50, 50);
      doc.moveDown();

      doc.fontSize(14).fillColor("#d3af47").text(`Email: ${ticket.email}`, 50);
      doc.moveDown();

      doc.fillColor("#d3af47").text(`Number of Tickets: ${ticket.numberOfTickets}`, 50);
      doc.moveDown();

      doc.fillColor("#d3af47").text(`Date: ${ticket.eventDate || "Not Provided"}`, 50);
      doc.moveDown();

      doc.fillColor("#d3af47").text(`Ticket ID: ${ticket.ticketId}`, 50);
      doc.moveDown(2);

      // QR image on right side
      if (qrImage && qrImage.startsWith("data:image")) {
        doc.image(qrImage, 350, 80, { width: 150 });
      } else {
        doc.fillColor("red").text("⚠️ QR Code not available", 350, 120);
      }

      // Footer instructions
      doc.moveDown(6);
      doc.fillColor("#e30b5d").fontSize(10).text(
        `Please arrive at least 30 minutes prior to the event start time.
This will allow ample time for security checks, ticket verification, and finding your seat.

For security reasons, the following items are strictly prohibited: outside food and beverages, weapons of any kind, illegal substances, large bags/backpacks.

Your ticket must be presented (either printed or digitally) for entry. Please have it ready for scanning upon arrival.

Follow the instructions of event staff and security personnel at all times.

Photography and videography policies: flash photography may be prohibited, and professional equipment may require prior authorization.

Please be mindful of other attendees and maintain respectful behavior throughout the event.

In case of an emergency, locate the nearest event staff member or security personnel.

No re-entry will be permitted once you exit the venue.

This ticket is non-transferable and may not be resold. Any attempt to do so may result in the ticket being voided.`
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateTicketPDF;
