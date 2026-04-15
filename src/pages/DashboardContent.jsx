import React from "react";
import { Box, Typography, Button, Breadcrumbs } from "@mui/material";
import {
  Settings as SettingsIcon,
  Add as AddIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

const DashboardContent = () => {
  const [userStats, setUserStats] = React.useState({ students: 0, teachers: 0, total: 0 });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await import("../api/userApi").then(m => m.getStats());
        const stats = response.data;
        setUserStats({
          students: stats.students,
          teachers: stats.teachers,
          total: stats.total
        });
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };
    if (user.role === 'admin') fetchStats();
  }, [user.role]);

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
              {user.name || "Administrator"}
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              maxWidth: 440,
              lineHeight: 1.5,
              mb: 3
            }}
          >
            Monitor and manage your campus ecosystem from this central command hub.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "#d4ccfd", border: "1px solid #DDD6FE", minWidth: "350px" }}>
              <Typography sx={{ color: "#7C3AED", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", mb: 1 }}>Students</Typography>
              <Typography variant="h4" sx={{ color: "#1E1B4B", fontWeight: 800 }}>{userStats.students}</Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "#ECFDF5", border: "1px solid #A7F3D0", minWidth: "350px" }}>
              <Typography sx={{ color: "#059669", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", mb: 1 }}>Teachers</Typography>
              <Typography variant="h4" sx={{ color: "#1E1B4B", fontWeight: 800 }}>{userStats.teachers}</Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "#b2d1f0", border: "1px solid #E5E7EB", minWidth: "350px" }}>
              <Typography sx={{ color: "#7a869f", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", mb: 1 }}>Total Users</Typography>
              <Typography variant="h4" sx={{ color: "#1E1B4B", fontWeight: 800 }}>{userStats.total}</Typography>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </>
  );
};

export default DashboardContent;
