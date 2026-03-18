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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
      
    if (email === "admin@gmail.com" && password === "admin!233") {
      navigate("/admin-dashboard");
    } else if (email === "teacher@gmail.com") {
      navigate("/teacher-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>

      <Grid
        item
        xs={false}
        md={6}
        sx={{
          background: "linear-gradient(135deg, #6C2BD9 0%, #A78BFA 50%, #00F5D4 100%)",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            top: -60,
            left: -60,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            bottom: 40,
            right: -40,
          }}
        />
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{ letterSpacing: "-0.5px", mb: 1, zIndex: 1 }}
        >
          AcademiaFlow
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ opacity: 0.85, zIndex: 1, textAlign: "center", maxWidth: 300 }}
        >
          Manage your institution with the next-gen ERP platform
        </Typography>
      </Grid>


      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={0}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
        }}
      >
        <Box sx={{ width: 360, px: 3 }}>

          <Typography
            variant="h5"
            fontWeight="800"
            sx={{
              display: { xs: "block", md: "none" },
              textAlign: "center",
              color: "#6C2BD9",
              mb: 2,
            }}
          >
            AcademiaFlow
          </Typography>

          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ color: "#1E1B4B", mb: 0.5 }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", mb: 4 }}
          >
            Sign in to continue to your dashboard
          </Typography>

          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#EF4444",
                backgroundColor: "#FEF2F2",
                borderRadius: "8px",
                padding: "10px 14px",
                mb: 2,
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
              id="login-email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#6C2BD9",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6C2BD9",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              id="login-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#6C2BD9",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6C2BD9",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              id="login-submit"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6C2BD9 0%, #5521B5 100%)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(108, 43, 217, 0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5521B5 0%, #4A1FA0 100%)",
                  boxShadow: "0 6px 20px rgba(108, 43, 217, 0.45)",
                },
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 3, color: "#6B7280", fontSize: "12.5px" }}
          >
            © 2024 AcademiaFlow. All rights reserved.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
