import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Logger } from "../../../Logging_Middleware/src";

const logger = new Logger({
  service: "url-statistics-frontend",
  level: "info",
});

const URLStatistics = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStats = async () => {
    try {
      logger.info("Fetching statistics for shortcode:", shortcode);

      const response = await axios.get(
        `http://localhost:5000/shorturls/${shortcode}`
      );
      setStats(response.data);
      setError("");

      logger.info("Statistics fetched successfully");
    } catch (error) {
      logger.error("Error fetching statistics:", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while fetching statistics"
      );
      setStats(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Enter Shortcode"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleFetchStats}
              disabled={!shortcode}
            >
              Fetch Statistics
            </Button>
          </Box>
        </CardContent>
      </Card>

      {stats && (
        <>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                URL Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Original URL: {stats.originalUrl}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Created: {new Date(stats.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Expires: {new Date(stats.expiry).toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Clicks: {stats.totalClicks}
              </Typography>
            </CardContent>
          </Card>

          {stats.clickData.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Click History
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.clickData.map((click, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(click.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{click.referrer}</TableCell>
                        <TableCell>{click.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default URLStatistics;
