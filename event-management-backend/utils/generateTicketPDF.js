const PDFDocument = require("pdfkit");

function generateTicketPDF({ email, eventName, numberOfTickets, eventDate, qrBuffer }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // Title
    doc.font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#e30b5d")
      .text("Gilded Gatherings Ticket", { align: "center" });

    doc.moveDown(1);

    // Event name
    doc.font("Helvetica")
      .fontSize(16)
      .fillColor("#d3af47")
      .text(`Event: ${eventName}`);

    // Email
    doc.moveDown(0.5);
    doc.font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#d3af47")
      .text(`Email: ${email}`);

    // Tickets
    doc.moveDown(0.5);
    doc.font("Helvetica")
      .fontSize(14)
      .fillColor("#d3af47")
      .text(`Tickets: ${numberOfTickets}`);

    // Optional Date
    if (eventDate) {
      doc.moveDown(0.5);
      doc.font("Helvetica")
        .fontSize(14)
        .fillColor("#d3af47")
        .text(`Date: ${eventDate}`);
    }

    // QR Code
    doc.moveDown(2);
    doc.image(qrBuffer, {
      fit: [140, 140],
      align: "center"
    });

    // Final Instructions
    doc.moveDown(14);
    const instructions = `
Please arrive at least 30 minutes prior to the event start time. This will allow ample time for security checks, ticket verification, and finding your seat.

For security reasons, the following items are strictly prohibited:
[e.g., outside food and beverages, weapons of any kind, illegal substances, large bags/backpacks]. A more detailed list may be available on our website.

Your ticket must be presented (either printed or digitally) for entry. Please have it ready for scanning upon arrival.

Follow the instructions of event staff and security personnel at all times. They are there to ensure a safe and enjoyable experience for everyone.

Photography and videography policies:
[if flash photography is prohibited, and professional equipment requires prior authorization].

Please be mindful of other attendees and maintain respectful behavior throughout the event.

In case of an emergency, please locate the nearest event staff member or security personnel for assistance. Emergency exits will be clearly marked.

No re-entry will be permitted once you have exited the venue. Please ensure you have everything you need with you.

This ticket is non-transferable and may not be resold. Any attempt to do so may result in the ticket being voided.
    `;

    doc.moveDown(1);
    doc.font("Helvetica")
      .fontSize(10)
      .fillColor("#e30b5d");

    instructions.trim().split("\n").forEach(line => {
      doc.text(line.trim());
      doc.moveDown(0.4);
    });

    doc.end();
  });
}

module.exports = generateTicketPDF;
