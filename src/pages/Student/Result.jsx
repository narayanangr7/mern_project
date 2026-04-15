import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import { EmojiEvents as TrophyIcon, Assignment as AssignmentIcon } from "@mui/icons-material";
import { getResults } from "../../api/resultApi";

const Result = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResults();
        setResults(res.data);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const getScoreColor = (score) => {
    const num = parseFloat(score);
    if (isNaN(num)) return { bgcolor: "#F3F4F6", color: "#4B5563" };
    if (num >= 80) return { bgcolor: "#DCFCE7", color: "#059669" };
    if (num >= 60) return { bgcolor: "#FEF9C3", color: "#D97706" };
    return { bgcolor: "#FEE2E2", color: "#DC2626" };
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#1E1B4B", mb: 0.5 }}>
          My Results
        </Typography>
        <Typography sx={{ color: "#6B7280", fontSize: "14px" }}>
          Your academic performance records published by the administration.
        </Typography>
      </Box>

      {/* Summary Banner */}
      {results.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrophyIcon sx={{ color: "#FCD34D", fontSize: 32 }} />
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Results Published For
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {user.name}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Results Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "20px", border: "1px solid #E5E7EB", overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#F9FAFB" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Student Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Score / Marks
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Published On
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <AssignmentIcon sx={{ fontSize: 48, color: "#E5E7EB", mb: 1 }} />
                  <Typography color="textSecondary" variant="body2">
                    No results have been published for you yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              results.map((result, idx) => {
                const scoreStyle = getScoreColor(result.score);
                return (
                  <TableRow key={result._id} hover>
                    <TableCell sx={{ color: "#9CA3AF", fontWeight: 600 }}>{idx + 1}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700, color: "#1E1B4B" }}>
                        {result.studentName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={result.score}
                        sx={{
                          fontWeight: 800,
                          fontSize: "14px",
                          ...scoreStyle,
                          borderRadius: "10px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#6B7280", fontSize: "13px" }}>
                      {new Date(result.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Result;
