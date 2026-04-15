import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon
} from "@mui/icons-material";
import { getResults, uploadResults, deleteResult } from "../api/resultApi";

const AdminResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await getResults();
      setResults(res.data);
    } catch (err) {
      console.error("Fetch results failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      
      await uploadResults(formData);
      setOpen(false);
      setFile(null);
      fetchResults();
    } catch (err) {
      console.error("Upload failed", err);
      const errorMsg = err.response?.data?.message || "Upload failed. Please check the console for details.";
      alert(errorMsg);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await deleteResult(id);
        fetchResults();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px", mb: 0.5, color: "#1E1B4B" }}>
            Result Management
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
            Upload academic results via Excel files and manage student records.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "#3B82F6", "&:hover": { bgcolor: "#2563EB" }, borderRadius: "12px", px: 3 }}
        >
          Upload Excel
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 0, borderRadius: "24px", bgcolor: "#fff", border: "1px solid #E5E7EB", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#F9FAFB" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Score / Marks</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Tamil</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Date  </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#4B5563" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={24} sx={{ my: 4 }} /></TableCell></TableRow>
              ) : results.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <AssignmentIcon sx={{ fontSize: 48, color: "#E5E7EB", mb: 2 }} />
                  <Typography color="textSecondary">No results uploaded yet.</Typography>
                </TableCell></TableRow>
              ) : (
                results.map((row) => (
                  <TableRow key={row._id} hover>
                    <TableCell sx={{ fontWeight: 600, color: "#111827" }}>{row.studentName}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TrendingUpIcon sx={{ color: "#10B981", fontSize: 18 }} />
                        <Typography sx={{ fontWeight: 700, color: "#059669" }}>{row.score}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#6B7280" }}>{row.tamil}</TableCell>  
                    <TableCell sx={{ color: "#6B7280" }}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => handleDelete(row._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Upload Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 800 }}>Upload Results Excel</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Paper 
              variant="outlined" 
              sx={{ 
                width: "100%", 
                p: 4, 
                borderStyle: "dashed", 
                textAlign: "center",
                bgcolor: file ? "#F0F9FF" : "#F9FAFB" 
              }}
            >
              <input
                type="file"
                accept=".xlsx, .xls"
                hidden
                id="excel-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="excel-upload" style={{ cursor: "pointer" }}>
                <UploadIcon sx={{ fontSize: 48, color: file ? "#3B82F6" : "#9CA3AF", mb: 2 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {file ? file.name : "Click to select Excel file"}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Accepts .xlsx and .xls formats
                </Typography>
              </label>
            </Paper>
            <Typography variant="caption" sx={{ color: "#6B7280", textAlign: "center" }}>
              Make sure Excel columns include <br/> <b>"Student Name"</b>, <b>"Marks"</b> and <b>"Tamil"</b> 
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleUpload} 
            disabled={!file || uploadLoading}
            sx={{ bgcolor: "#3B82F6" }}
          >
            {uploadLoading ? <CircularProgress size={20} color="inherit" /> : "Start Processing"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminResult;
