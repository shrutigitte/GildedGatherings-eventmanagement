const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  popularity: { type: Number, default: 0 }
});

module.exports = mongoose.model("Event", eventSchema);
