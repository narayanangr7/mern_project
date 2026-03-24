import React from "react";
import { Box, Typography, Button, Breadcrumbs } from "@mui/material";
import {
  Settings as SettingsIcon,
  Add as AddIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

const DashboardContent = () => {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: "16px", opacity: 0.5 }} />}
        sx={{
          mb: 1,
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        <Typography
          color="text.secondary"
          sx={{ fontSize: "inherit", fontWeight: "inherit" }}
        >
          MAIN VIEW
        </Typography>
        <Typography
          color="primary"
          sx={{ fontSize: "inherit", fontWeight: "inherit" }}
        >
          ADMIN DASHBOARD
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              mb: 0.5,
              color: "#1E1B4B",
            }}
          >
            Welcome back,{" "}
            <Box
              component="span"
              sx={{ color: "#6C2BD9", fontStyle: "italic" }}
            >
              Administrator
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              maxWidth: 440,
              lineHeight: 1.5,
            }}
          >
            Monitor institutional performance, manage users, and control
            academic flows from your futuristic control panel.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexShrink: 0 }}>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderColor: "#E5E7EB",
              color: "#1E1B4B",
              "&:hover": {
                borderColor: "#6C2BD9",
                color: "#6C2BD9",
                bgcolor: "transparent",
              },
            }}
          >
            System Audit
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              bgcolor: "#6C2BD9",
              boxShadow: "0 4px 12px rgba(108, 43, 217, 0.3)",
              "&:hover": {
                bgcolor: "#5521B5",
                boxShadow: "0 6px 16px rgba(108, 43, 217, 0.4)",
              },
            }}
          >
            Quick Action
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DashboardContent;
