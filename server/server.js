const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server working fine" });
});

app.listen(4000, () => {
  connectDB();
  console.log("Server running on port 4000");
});
