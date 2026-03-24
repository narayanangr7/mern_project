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
    Notifications as NotificationsIcon,
    DarkMode as DarkModeIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

const Topbar = () => {
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
    );
};

export default Topbar;
