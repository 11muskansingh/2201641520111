const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const { Logger } = require("../../../Logging_Middleware/src");

const logger = new Logger({
  service: "url-shortener-routes",
  level: "info",
});

// In-memory storage (replace with database in production)
const urlDatabase = new Map();
const urlStats = new Map();

// Create short URL
router.post("/", (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    // Validate URL
    if (!validUrl.isUri(url)) {
      logger.error("Invalid URL format");
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Set expiry time (default 30 minutes if not specified)
    const validityMinutes = validity || 30;
    const expiryDate = new Date(Date.now() + validityMinutes * 60000);

    // Generate or use custom shortcode
    let finalShortcode = shortcode;
    if (!finalShortcode) {
      finalShortcode = shortid.generate();
    } else if (urlDatabase.has(finalShortcode)) {
      logger.error("Shortcode already exists");
      return res.status(409).json({ error: "Shortcode already in use" });
    }

    // Store URL data
    urlDatabase.set(finalShortcode, {
      originalUrl: url,
      expiry: expiryDate,
      createdAt: new Date(),
    });

    // Initialize stats
    urlStats.set(finalShortcode, {
      clicks: 0,
      clickData: [],
    });

    const shortLink = `http://localhost:5000/${finalShortcode}`;

    logger.info(`Created short URL: ${shortLink}`);
    res.status(201).json({
      shortLink,
      expiry: expiryDate.toISOString(),
    });
  } catch (error) {
    logger.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get URL statistics
router.get("/:shortcode", (req, res) => {
  try {
    const { shortcode } = req.params;

    if (!urlDatabase.has(shortcode)) {
      logger.error(`Shortcode not found: ${shortcode}`);
      return res.status(404).json({ error: "Short URL not found" });
    }

    const urlData = urlDatabase.get(shortcode);
    const stats = urlStats.get(shortcode);

    res.json({
      originalUrl: urlData.originalUrl,
      createdAt: urlData.createdAt,
      expiry: urlData.expiry,
      totalClicks: stats.clicks,
      clickData: stats.clickData,
    });
  } catch (error) {
    logger.error("Error fetching URL statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Redirect to original URL
router.get("/redirect/:shortcode", (req, res) => {
  try {
    const { shortcode } = req.params;

    if (!urlDatabase.has(shortcode)) {
      logger.error(`Shortcode not found: ${shortcode}`);
      return res.status(404).json({ error: "Short URL not found" });
    }

    const urlData = urlDatabase.get(shortcode);

    // Check if URL has expired
    if (new Date() > new Date(urlData.expiry)) {
      logger.error(`URL expired: ${shortcode}`);
      return res.status(410).json({ error: "URL has expired" });
    }

    // Record click data
    const stats = urlStats.get(shortcode);
    stats.clicks += 1;
    stats.clickData.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "Direct",
      location: req.ip, // In production, use a geolocation service
    });

    logger.info(`Redirecting ${shortcode} to ${urlData.originalUrl}`);
    res.redirect(urlData.originalUrl);
  } catch (error) {
    logger.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
