import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Logger } from "../../../Logging_Middleware/src";

const logger = new Logger({
  service: "url-shortener-frontend",
  level: "info",
});

const URLShortener = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleAddURL = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleRemoveURL = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const validateInputs = () => {
    for (const urlData of urls) {
      if (!urlData.url) {
        setError("URL is required");
        return false;
      }

      if (
        urlData.validity &&
        (!Number.isInteger(Number(urlData.validity)) ||
          Number(urlData.validity) <= 0)
      ) {
        setError("Validity must be a positive integer");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateInputs()) return;

      setError("");
      const shortenedUrls = [];

      for (const urlData of urls) {
        logger.info("Sending request to shorten URL:", urlData.url);

        const response = await axios.post("http://localhost:5000/shorturls", {
          url: urlData.url,
          validity: urlData.validity || 30,
          shortcode: urlData.shortcode || undefined,
        });

        shortenedUrls.push({
          originalUrl: urlData.url,
          ...response.data,
        });

        logger.info("URL shortened successfully:", response.data.shortLink);
      }

      setResults(shortenedUrls);
      setUrls([{ url: "", validity: "", shortcode: "" }]);
    } catch (error) {
      logger.error("Error shortening URL:", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while shortening the URL"
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {urls.map((urlData, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <TextField
                fullWidth
                label="URL"
                value={urlData.url}
                onChange={(e) =>
                  handleInputChange(index, "url", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              {urls.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => handleRemoveURL(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Validity (minutes)"
                type="number"
                value={urlData.validity}
                onChange={(e) =>
                  handleInputChange(index, "validity", e.target.value)
                }
                sx={{ width: "200px" }}
              />
              <TextField
                label="Custom Shortcode (optional)"
                value={urlData.shortcode}
                onChange={(e) =>
                  handleInputChange(index, "shortcode", e.target.value)
                }
              />
            </Box>
          </CardContent>
        </Card>
      ))}

      {urls.length < 5 && (
        <Button startIcon={<AddIcon />} onClick={handleAddURL} sx={{ mb: 2 }}>
          Add Another URL
        </Button>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mb: 4 }}
      >
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Results
          </Typography>
          {results.map((result, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Original URL: {result.originalUrl}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Short URL:{" "}
                  <a
                    href={result.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.shortLink}
                  </a>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Expires at: {new Date(result.expiry).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default URLShortener;
