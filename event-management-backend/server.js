const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const passport = require("passport");
// require("./config/passport"); 


dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// app.use("/api/contact", require("./routes/contact"));
app.use("/api", require("./routes/contact")); // ✅ Contact
app.use("/api/auth", require("./routes/auth")); // ✅ authorization /login/signup
app.use("/api/subscribe", require("./routes/subscribe")); //subscription of newsletter
app.use("/api/payment", require("./routes/payment")); //payment

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
