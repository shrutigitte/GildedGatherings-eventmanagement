const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  numberOfTickets: { type: Number, required: true },
  eventDate: { type: String },
  ticketId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);
