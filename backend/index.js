require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./src/config/data");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("TalkFow Backend is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
