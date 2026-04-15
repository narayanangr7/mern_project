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
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  GetApp as DownloadIcon,
  PictureAsPdf as PdfIcon,
  FolderZip as ZipIcon,
  Article as DocIcon,
  Slideshow as PptIcon,
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";
import { getMaterials } from "../../api/materialApi";

const StudyMaterialStudent = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await getMaterials();
        setMaterials(res.data);
      } catch (err) {
        console.error("Failed to fetch materials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const getFileIcon = (filename) => {
    const ext = filename?.split(".").pop().toLowerCase();
    if (ext === "pdf") return <PdfIcon sx={{ color: "#EF4444" }} />;
    if (["doc", "docx"].includes(ext)) return <DocIcon sx={{ color: "#3B82F6" }} />;
    if (["zip", "rar"].includes(ext)) return <ZipIcon sx={{ color: "#10B981" }} />;
    if (["ppt", "pptx"].includes(ext)) return <PptIcon sx={{ color: "#F59E0B" }} />;
    return <DocIcon sx={{ color: "#6B7280" }} />;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#1E1B4B", mb: 0.5 }}>
          Study Materials
        </Typography>
        <Typography sx={{ color: "#6B7280", fontSize: "14px" }}>
          Access all shared lecture notes, resources, and materials uploaded by your teachers.
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "20px", border: "1px solid #E5E7EB", overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#F9FAFB" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Material Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Uploaded By
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}>
                Date
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "#4B5563", fontSize: "13px" }}
              >
                Download
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : materials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <MenuBookIcon sx={{ fontSize: 48, color: "#E5E7EB", mb: 1 }} />
                  <Typography color="textSecondary" variant="body2">
                    No study materials available yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              materials.map((material) => (
                <TableRow key={material._id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {getFileIcon(material.file)}
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#1E1B4B", fontSize: "14px" }}>
                          {material.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                          {new Date(material.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={material.subject || "General"}
                      size="small"
                      sx={{ bgcolor: "#F3E8FF", color: "#6C2BD9", fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "13px", color: "#4B5563" }}>
                      {material.uploadedBy?.name || "Faculty"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
                      {new Date(material.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component="a"
                      href={`http://localhost:5000/${material.file}`}
                      target="_blank"
                      download
                      sx={{
                        bgcolor: "#2DD4BF",
                        color: "#fff",
                        "&:hover": { bgcolor: "#14b8a6" },
                        width: 36,
                        height: 36,
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudyMaterialStudent;
