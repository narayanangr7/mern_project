import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthBanner from "../components/AuthBanner";
import { loginUser } from "../api/userApi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
      
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user || { role: response.data.role }));

      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (response.data.role === "student") {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#F9FAFB" }}>
      {/* Left side banner */}
      <Grid size={{ md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <AuthBanner />
      </Grid>

      {/* Right side form */}
      <Grid
        size={{ xs: 12, md: 6 }}
        component={Box}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 480,
            p: 5,
            bgcolor: "white",
            borderRadius: "24px",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
            mx: 2,
          }}
        >
          {/* Logo Area */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: "#4A1FA0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
              }}
            >
              {/* Dummy heartbeat icon representation */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography variant="h5" fontWeight="800" sx={{ color: "#371D70", letterSpacing: "-0.5px" }}>
              AcademiaFlow
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight="800" align="center" sx={{ color: "#111827", mb: 1, letterSpacing: "-0.5px" }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: "#6B7280", mb: 4 }}>
            Please enter your details to access your dashboard.
          </Typography>

          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#EF4444",
                backgroundColor: "#FEF2F2",
                borderRadius: "10px",
                padding: "10px 14px",
                mb: 3,
                fontWeight: 500,
                fontSize: "13px",
              }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F9FAFB",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                  "&.Mui-focused fieldset": { borderColor: "#00F5D4", borderWidth: "2px" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#371D70" },
              }}
            />

            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                placeholder="••••••••"
                sx={{
                  m: 0,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#F9FAFB",
                    "& fieldset": { borderColor: "#E5E7EB" },
                    "&:hover fieldset": { borderColor: "#D1D5DB" },
                    "&.Mui-focused fieldset": { borderColor: "#00F5D4", borderWidth: "2px" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#371D70" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <MuiLink
                href="#"
                underline="hover"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: -24,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#6B7280",
                  "&:hover": { color: "#371D70" }
                }}
              >
                Forgot Password?
              </MuiLink>
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              endIcon={<ArrowForward sx={{ ml: 1, fontSize: 18 }} />}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                bgcolor: "#00E0C2",
                color: "#111827",
                fontWeight: "700",
                fontSize: "15px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(0, 245, 212, 0.25)",
                "&:hover": {
                  bgcolor: "#00F5D4",
                  boxShadow: "0 6px 20px rgba(0, 245, 212, 0.4)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s"
              }}
            >
              Sign In
            </Button>
          </form>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
