const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const eventRoutes = require("./routes/events");

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api", require("./routes/contact")); // ✅ Contact
app.use("/api/auth", require("./routes/auth")); // ✅ authorization /login/signup
app.use("/api/subscribe", require("./routes/subscribe")); //subscription of newsletter
app.use("/api/payment", require("./routes/payment")); //payment
app.use("/api/events", eventRoutes); //eventgrid
app.use("/api/admin", require("./routes/adminRoutes")); //admin page


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
