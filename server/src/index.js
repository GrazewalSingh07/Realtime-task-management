const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser')
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Enable CORS for requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDB();
});