import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ResultsIcon,
  CalendarToday as TimetableIcon,
  Campaign as NoticeIcon,
  MenuBook as MaterialsIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

export const navItems = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "users",
    icon: <PeopleIcon />,
    label: "User Management",
    path: "/user-management",
  },
  { id: "results", icon: <ResultsIcon />, label: "Results", path: "/results" },
  {
    id: "timetable",
    icon: <TimetableIcon />,
    label: "Timetable",
    path: "/timetable",
  },
  {
    id: "notices",
    icon: <NoticeIcon />,
    label: "Notice Board",
    path: "/notices",
  },
  {
    id: "materials",
    icon: <MaterialsIcon />,
    label: "Study Materials",
    path: "/materials",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeNav =
    navItems.find((item) => item.path === location.pathname)?.id || "dashboard";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #6C2BD9 0%, #5521B5 100%)",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          padding: "20px 22px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#fff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6C2BD9",
          }}
        >
          <SchoolIcon fontSize="small" />
        </Box>
        <Typography variant="h6" sx={{ fontSize: "17px", fontWeight: 700 }}>
          AcademiaFlow
        </Typography>
      </Box>

      <List
        sx={{
          flex: 1,
          px: 1.5,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: "8px",
                  bgcolor: isActive
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                  color: isActive ? "#fff" : "rgba(255, 255, 255, 0.7)",
                  fontWeight: isActive ? 600 : 500,
                  position: "relative",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.12)",
                    color: "#fff",
                  },
                  "&::after": isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        width: "7px",
                        height: "7px",
                        bgcolor: "#A78BFA",
                        borderRadius: "50%",
                        boxShadow: "0 0 8px rgba(167, 139, 250, 0.6)",
                      }
                    : {},
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px", color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
