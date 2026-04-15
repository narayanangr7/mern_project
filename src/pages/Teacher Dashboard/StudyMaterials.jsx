import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputBase,
  Pagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  GetApp as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Article as DocIcon,
  FolderZip as ZipIcon,
  Slideshow as PptIcon,
  Add as AddIcon
} from "@mui/icons-material";
import { getMaterials, uploadMaterial } from "../../api/materialApi";

const StudyMaterials = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isTeacher = user.role === "teacher";

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await getMaterials();
      setMaterials(res.data);
    } catch (err) {
      console.error("Fetch materials failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleUpload = async () => {
    if (!file || !title) return;
    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("subject", subject);
      
      await uploadMaterial(formData);
      setOpen(false);
      setFile(null);
      setTitle("");
      setSubject("");
      fetchMaterials();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploadLoading(false);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <PdfIcon sx={{ color: "#EF4444" }} />;
    if (['doc', 'docx'].includes(ext)) return <DocIcon sx={{ color: "#3B82F6" }} />;
    if (['zip', 'rar'].includes(ext)) return <ZipIcon sx={{ color: "#10B981" }} />;
    if (['ppt', 'pptx'].includes(ext)) return <PptIcon sx={{ color: "#F59E0B" }} />;
    return <DocIcon sx={{ color: "#6B7280" }} />;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px", mb: 0.5, color: "#6C2BD9" }}>
            Study Materials
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
            {isTeacher ? "Manage and upload educational resources." : "Access lecture notes and institutional resources."}
          </Typography>
        </Box>
        {isTeacher && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ bgcolor: "#6C2BD9", "&:hover": { bgcolor: "#5A24B5" }, borderRadius: "12px", px: 3 }}
          >
            Upload Material
          </Button>
        )}
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", bgcolor: "#fff", mb: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E1B4B" }}>Resource Library</Typography>
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#F3F4F6", borderRadius: "12px", px: 2, py: 0.5 }}>
            <SearchIcon sx={{ color: "#9CA3AF" }} />
            <InputBase placeholder="Search materials..." sx={{ ml: 1, fontSize: "14px", width: "250px" }} />
          </Box>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#6B7280", fontWeight: 600, fontSize: "12px" }}>Filename</TableCell>
                <TableCell sx={{ color: "#6B7280", fontWeight: 600, fontSize: "12px" }}>Subject</TableCell>
                <TableCell sx={{ color: "#6B7280", fontWeight: 600, fontSize: "12px" }}>Uploaded By</TableCell>
                <TableCell sx={{ color: "#6B7280", fontWeight: 600, fontSize: "12px" }}>Date</TableCell>
                <TableCell sx={{ color: "#6B7280", fontWeight: 600, fontSize: "12px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={24} sx={{ my: 2 }} /></TableCell></TableRow>
              ) : materials.length === 0 ? (
                <TableRow><TableCell colSpan={5} align="center">No materials available yet.</TableCell></TableRow>
              ) : (
                materials.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {getFileIcon(row.file)}
                        <Typography sx={{ fontWeight: 600, color: "#1E1B4B", fontSize: "14px" }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={row.subject || "General"} size="small" sx={{ bgcolor: "#F3E8FF", color: "#6C2BD9" }} /></TableCell>
                    <TableCell><Typography sx={{ fontSize: "13px" }}>{row.uploadedBy?.name}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: "13px", color: "#6B7280" }}>{new Date(row.createdAt).toLocaleDateString()}</Typography></TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component="a"
                        href={`http://localhost:5000/${row.file}`}
                        target="_blank"
                        download
                      >
                        <DownloadIcon />
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
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Upload Study Material</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField label="Material Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. OS Lecture 1" />
            <TextField label="Subject" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Operating Systems" />
            <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
              {file ? file.name : "Select File"}
              <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpload} disabled={!file || !title || uploadLoading} sx={{ bgcolor: "#6C2BD9" }}>
            {uploadLoading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyMaterials;
