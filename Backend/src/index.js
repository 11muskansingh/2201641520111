const express = require("express");
const cors = require("cors");
const { Logger } = require("../../Logging_Middleware/src");
const urlRoutes = require("./routes/url.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize logger
const logger = new Logger({
  service: "url-shortener-backend",
  level: "info",
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Routes
app.use("/shorturls", urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Error occurred:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
