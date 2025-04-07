
// const PDFDocument = require("pdfkit");

// const generateTicketPDF = (ticket, qrImageDataURL) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({
//         size: "A4",
//         margin: 0,
//       });

//       const buffers = [];

//       doc.on("data", buffers.push.bind(buffers));
//       doc.on("end", () => {
//         const pdfData = Buffer.concat(buffers);
//         resolve(pdfData);
//       });

//       // Full black background
//       doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");

//       const contentX = 50;
//       let currentY = 50;

//       // Title - Gilded Gatherings
//       doc
//         .fillColor("#d3af47")
//         .fontSize(26)
//         .text("Gilded Gatherings", 0, currentY, {
//           align: "center",
//           width: doc.page.width,
//         });

//       currentY += 30; // Small spacing

//       // Horizontal line
//       doc
//         .moveTo(contentX, currentY)
//         .lineTo(doc.page.width - contentX, currentY)
//         .strokeColor("#d3af47")
//         .lineWidth(1)
//         .stroke();

//       currentY += 20; // Small gap after line
      

//       // Ticket Info
//       doc.fillColor("#e30b5d").fontSize(16).text(`Event: ${ticket.eventName}`, contentX, currentY);
//       currentY += 26;

//       doc.fillColor("#ffffff").fontSize(14).text(`Email: ${ticket.email}`, contentX, currentY);
//       currentY += 22;

//       doc.text(`Number of Tickets: ${ticket.numberOfTickets}`, contentX, currentY);
//       currentY += 22;

//       doc.text(`Date: ${ticket.eventDate || "Not Provided"}`, contentX, currentY);
//       currentY += 22;

//       doc.text(`Ticket ID: ${ticket.ticketId}`, contentX, currentY);
//       currentY += 40;

//       // QR Code
//       if (qrImageDataURL && qrImageDataURL.startsWith("data:image")) {
//         const base64Data = qrImageDataURL.split(",")[1];
//         const qrBuffer = Buffer.from(base64Data, "base64");

//         // Optional black box behind QR
//         doc.rect(doc.page.width - 180, 130, 120, 120).fill("#000000");

//         doc.image(qrBuffer, doc.page.width - 180, 130, { width: 120 });
//       } else {
//         doc.fillColor("red").fontSize(12).text("⚠️ QR Code not available", doc.page.width - 200, 160);
//       }

//       // Footer section padding
//       const footerHeight = 280;
//       const bottomPadding = 30;
//       const footerY = doc.page.height - footerHeight - bottomPadding;

//       // Black footer bg
//       doc
//         .fillColor("#000000")
//         .rect(0, footerY, doc.page.width, footerHeight)
//         .fill();

//       // Instructions Title
//       doc
//         .fillColor("#d3af47")
//         .fontSize(16)
//         .text("Instructions", contentX, footerY + 20, {
//           width: doc.page.width - contentX * 2,
//           align: "left",
//         });

//       // Actual instructions text
//       const instructions = `1. Please arrive at least 30 minutes before the event.

// 2. Security checks, ticket verification, and seat finding require time.

// 3. Prohibited: outside food/drinks, weapons, illegal substances, large bags.

// 4. Show your ticket at entry (printed or digital).

// 5. Respect event staff and follow all instructions.

// 6. Flash photography may be prohibited. Pro gear needs permission.

// 7. No re-entry after exiting. Tickets are non-transferable and non-refundable.`;

//       doc
//         .fillColor("#FFFFFF")
//         .fontSize(10)
//         .text(instructions, contentX, footerY + 50, {
//           width: doc.page.width - contentX * 2,
//           align: "left",
//           lineGap: 4,
//         });

//       doc.end();
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// module.exports = generateTicketPDF;
const axios = require("axios");
const PDFDocument = require("pdfkit");

const generateTicketPDF = async (ticket, qrImageDataURL) => {
  try {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
    });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    const endPromise = new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(buffers)));
    });

    // Full black background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");

    const contentX = 50;
    let currentY = 50;

    // Title
    doc
      .fillColor("#d3af47")
      .fontSize(26)
      .text("Gilded Gatherings", 0, currentY, {
        align: "center",
        width: doc.page.width,
      });

    currentY += 30;

    // Line
    doc
      .moveTo(contentX, currentY)
      .lineTo(doc.page.width - contentX, currentY)
      .strokeColor("#d3af47")
      .lineWidth(1)
      .stroke();

    currentY += 20;

    // ✅ Load image
    if (ticket.image) {
      try {
        const imageRes = await axios.get(ticket.image, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(imageRes.data, "binary");

        doc.image(imageBuffer, contentX, currentY, {
          width: doc.page.width - contentX * 2,
        });

        currentY += 140;
      } catch (err) {
        console.error("⚠️ Failed to load event image:", err.message);
        currentY += 20;
      }
    }

    // Ticket info
    doc.fillColor("#e30b5d").fontSize(16).text(`Event: ${ticket.eventName}`, contentX, currentY);
    currentY += 26;

    doc.fillColor("#ffffff").fontSize(14).text(`Email: ${ticket.email}`, contentX, currentY);
    currentY += 22;

    doc.text(`Number of Tickets: ${ticket.numberOfTickets}`, contentX, currentY);
    currentY += 22;

    doc.text(`Date: ${ticket.eventDate || "Not Provided"}`, contentX, currentY);
    currentY += 22;

    doc.text(`Ticket ID: ${ticket.ticketId}`, contentX, currentY);
    currentY += 40;

    // QR Code
    if (qrImageDataURL && qrImageDataURL.startsWith("data:image")) {
      const base64Data = qrImageDataURL.split(",")[1];
      const qrBuffer = Buffer.from(base64Data, "base64");

      doc.image(qrBuffer, doc.page.width - 180, 130, { width: 120 });
    } else {
      doc.fillColor("red").fontSize(12).text("⚠️ QR Code not available", doc.page.width - 200, 160);
    }

    // Footer instructions
    doc
      .fillColor("#d3af47")
      .fontSize(16)
      .text("Instructions", contentX, currentY + 30);

    const instructions = `1. Please arrive at least 30 minutes before the event.

2. Security checks, ticket verification, and seat finding require time.

3. Prohibited: outside food/drinks, weapons, illegal substances, large bags.

4. Show your ticket at entry (printed or digital).

5. Respect event staff and follow all instructions.

6. Flash photography may be prohibited. Pro gear needs permission.

7. No re-entry after exiting. Tickets are non-transferable and non-refundable.`;

    doc
      .fillColor("#FFFFFF")
      .fontSize(10)
      .text(instructions, contentX, currentY + 60, {
        width: doc.page.width - contentX * 2,
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
