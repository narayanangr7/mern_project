import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Avatar,
  Button,
  Badge,
  Breadcrumbs,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Zoom,
  Fade,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ResultsIcon,
  CalendarToday as TimetableIcon,
  Campaign as NoticeIcon,
  MenuBook as MaterialsIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const navItems = [
  { id: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { id: "users", icon: <PeopleIcon />, label: "User Management" },
  { id: "results", icon: <ResultsIcon />, label: "Results" },
  { id: "timetable", icon: <TimetableIcon />, label: "Timetable" },
  { id: "notices", icon: <NoticeIcon />, label: "Notice Board" },
  { id: "materials", icon: <MaterialsIcon />, label: "Study Materials" },
];

const departments = [
  "Computer Science",
  "Data Science",
  "Information Tech",
  "Software Eng",
  "Mathematics",
  "Physics",
  "Administrative",
  "Electrical Eng",
  "Mechanical Eng",
  "Civil Eng",
];

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  department: "",
  role: "",
  address: "",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    transition: "all 0.2s",
    "&:hover": { backgroundColor: "#F3F4F6" },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.12)",
    },
  },
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    setFormData(initialFormState);
  };

  const handleFormChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("New User Data:", formData);
    handleCloseAddUser();
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F4F2F7",
        color: "#1E1B4B",
      }}
    >
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
                  onClick={() => setActiveNav(item.id)}
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

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
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
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#F4F2F7" },
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
                    admin User
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#6C2BD9",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ADMIN
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
                  AU
                </Avatar>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, padding: "28px" }}>
          <Breadcrumbs
            separator={
              <NavigateNextIcon sx={{ fontSize: "16px", opacity: 0.5 }} />
            }
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
        </Box>

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
          © 2024{" "}
          <Box component="strong" sx={{ color: "#6C2BD9" }}>
            AcademiaFlow
          </Box>
          . All rights reserved. Designed for the future of education.
        </Box>

        {/* Floating Action Button */}
        <Zoom in={!openAddUser}>
          <Fab
            id="add-user-fab"
            color="primary"
            aria-label="add user"
            onClick={handleOpenAddUser}
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6C2BD9 100%)",
              boxShadow: "0 6px 20px rgba(108, 43, 217, 0.45)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background: "linear-gradient(135deg, #7C3AED 0%, #5521B5 100%)",
                boxShadow: "0 8px 28px rgba(108, 43, 217, 0.6)",
                transform: "scale(1.08)",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 28 }} />
          </Fab>
        </Zoom>

        {/* Add User Modal Dialog */}
        <Dialog
          open={openAddUser}
          onClose={handleCloseAddUser}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Fade}
          transitionDuration={350}
          PaperProps={{
            sx: {
              borderRadius: "20px",
              boxShadow:
                "0 24px 80px rgba(108, 43, 217, 0.18), 0 8px 32px rgba(0,0,0,0.08)",
              overflow: "hidden",
            },
          }}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(30, 27, 75, 0.4)",
              backdropFilter: "blur(6px)",
            },
          }}
        >
          {/* Modal Header */}
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, #6C2BD9 0%, #5521B5 100%)",
              color: "#fff",
              padding: "20px 28px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  bgcolor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonAddIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "18px", lineHeight: 1.2 }}
                >
                  Add Teacher / Student
                </Typography>
                <Typography sx={{ fontSize: "12px", opacity: 0.75, mt: 0.25 }}>
                  Fill in the details to create a new user account
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleCloseAddUser}
              sx={{
                color: "rgba(255,255,255,0.7)",
                "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Modal Body */}
          <DialogContent sx={{ padding: "32px 28px 16px !important" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              {/* Row 1: Full Name & Email */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="add-user-fullname"
                  label="Full Name"
                  placeholder="e.g. Dr. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={handleFormChange("fullName")}
                  fullWidth
                  variant="outlined"
                  sx={inputSx}
                />
                <TextField
                  id="add-user-email"
                  label="Email Address"
                  placeholder="e.g. sarah@academia.edu"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange("email")}
                  fullWidth
                  variant="outlined"
                  sx={inputSx}
                />
              </Box>

              {/* Row 2: Phone & Department */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="add-user-phone"
                  label="Phone Number"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleFormChange("phone")}
                  fullWidth
                  variant="outlined"
                  sx={inputSx}
                />
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel id="add-user-department-label">
                    Department
                  </InputLabel>
                  <Select
                    id="add-user-department"
                    labelId="add-user-department-label"
                    value={formData.department}
                    onChange={handleFormChange("department")}
                    label="Department"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Row 3: Role */}
              <FormControl fullWidth sx={inputSx}>
                <InputLabel id="add-user-role-label">Role</InputLabel>
                <Select
                  id="add-user-role"
                  labelId="add-user-role-label"
                  value={formData.role}
                  onChange={handleFormChange("role")}
                  label="Role"
                >
                  <MenuItem value="teacher">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#8B5CF6",
                        }}
                      />
                      Teacher
                    </Box>
                  </MenuItem>
                  <MenuItem value="student">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#10B981",
                        }}
                      />
                      Student
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Row 4: Address */}
              <TextField
                id="add-user-address"
                label="Address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleFormChange("address")}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                sx={inputSx}
              />
            </Box>
          </DialogContent>

          {/* Modal Footer */}
          <DialogActions
            sx={{
              padding: "16px 28px 24px",
              gap: 1.5,
            }}
          >
            <Button
              id="add-user-cancel-btn"
              onClick={handleCloseAddUser}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 28px",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": {
                  borderColor: "#D1D5DB",
                  bgcolor: "#F9FAFB",
                  color: "#374151",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              id="add-user-submit-btn"
              onClick={handleSubmit}
              variant="contained"
              startIcon={<PersonAddIcon />}
              disabled={!formData.fullName || !formData.email || !formData.role}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 28px",
                background: "linear-gradient(135deg, #8B5CF6 0%, #6C2BD9 100%)",
                boxShadow: "0 4px 14px rgba(108, 43, 217, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #5521B5 100%)",
                  boxShadow: "0 6px 20px rgba(108, 43, 217, 0.45)",
                },
                "&.Mui-disabled": {
                  background: "#E5E7EB",
                  color: "#9CA3AF",
                  boxShadow: "none",
                },
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
