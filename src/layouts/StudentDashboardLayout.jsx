import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "../components/Student";
import Topbar from "../components/Topbar";

const StudentDashboardLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F4F2F7",
        color: "#1E1B4B",
      }}
    >
      {/* Sidebar Component */}
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Topbar Component */}
        <Topbar />

        {/* Main Content Area */}
        <Box sx={{ flex: 1, padding: "28px" }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            padding: "16px 28px",
            textAlign: "center",
            fontSize: "12px",
            color: "#6B7280",
            borderTop: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
          }}
        >
           2024{" "}
          <Box component="strong" sx={{ color: "#6C2BD9" }}>
            StudentFlow
          </Box>
          . All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboardLayout;
