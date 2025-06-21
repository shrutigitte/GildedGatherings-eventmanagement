
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },         
  description: { type: String, required: true },
  
  image: { type: String, required: true },
  sponsors: [{ type: String }], 
  testimonials: [{                                  
    name: { type: String },
    comment: { type: String }
  }],
  cancellationPolicy: { type: String }, 
  ticketPrice: { type: Number ,default: 0},
  popularity: { type: Number, default: 0 }
});

module.exports = mongoose.model("Event", eventSchema);
