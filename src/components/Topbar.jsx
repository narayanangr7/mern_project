import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";

import {
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        color: "#1E1B4B",
        width: `calc(100% - ${240}px)`,
        ml: `${240}px`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px !important",
          px: "28px !important",
        }}
      >
        <Box sx={{ position: "relative", width: 320 }}>
          <Box
            sx={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              color: "#6B7280",
            }}
          >
            <SearchIcon fontSize="small" />

            <InputBase
              placeholder="Search dashboard..."
              sx={{
                width: "100%",
                padding: "6px 16px 6px 42px",
                border: "1px solid #E5E7EB",
                borderRadius: "24px",
                fontSize: "13px",
                bgcolor: "#F4F2F7",
                transition: "all 0.2s",
                "&.Mui-focused": {
                  borderColor: "#8B5CF6",
                  boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.12)",
                  bgcolor: "#FFFFFF",
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              width: 38,
              height: 38,
              border: "1px solid #E5E7EB",
              "&:hover": {
                color: "#6C2BD9",
                borderColor: "#8B5CF6",
                bgcolor: "#F4F2F7",
              },
            }}
          >
            <Badge
              color="error"
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  right: 2,
                  top: 2,
                  border: "1.5px solid #fff",
                },
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
          <IconButton
            sx={{
              width: 38,
              height: 38,
              border: "1px solid #E5E7EB",
              "&:hover": {
                color: "#6C2BD9",
                borderColor: "#8B5CF6",
                bgcolor: "#F4F2F7",
              },
            }}
          >
            <DarkModeIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              ml: 1,
              padding: "4px 8px",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1E1B4B",
                  lineHeight: 1.2,
                }}
              >
                {user.name || "User"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#6C2BD9",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
              >
                {user.role || "Guest"}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #8B5CF6, #6C2BD9)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {(user.name || "U").charAt(0)}
            </Avatar>
            <IconButton
              onClick={handleLogout}
              sx={{
                ml: 1,
                width: 38,
                height: 38,
                border: "1px solid #E5E7EB",
                "&:hover": {
                  color: "#EF4444",
                  borderColor: "#EF4444",
                  bgcolor: "#FEF2F2",
                },
              }}
              title="Logout"
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
