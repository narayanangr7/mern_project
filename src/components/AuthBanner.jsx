import React from "react";
import { Box, Typography } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';

const AuthBanner = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #371D70 0%, #5E2A9D 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        p: 6,
      }}
    >
      {/* Abstract Shapes */}
      <Box
        sx={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          top: "20%",
          left: "25%",
          transform: "rotate(-15deg)",
          zIndex: 1
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          bottom: "25%",
          left: "35%",
          transform: "rotate(15deg)",
          zIndex: 1
        }}
      />

      <Box sx={{ zIndex: 2, textAlign: "center", maxWidth: 500 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            mb: 4,
            backdropFilter: "blur(10px)",
          }}
        >
          <BoltIcon sx={{ color: "#00F5D4", fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
            The Future of Campus ERP is Here
          </Typography>
        </Box>

        <Typography
          variant="h2"
          fontWeight="800"
          sx={{
            letterSpacing: "-1px",
            lineHeight: 1.2,
            mb: 3,
            fontSize: { xs: "2.5rem", md: "3.5rem" }
          }}
        >
          Manage Your <br />
          <Box component="span" sx={{ color: "#00F5D4" }}>Academia</Box> <br />
          with Fluidity.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.85,
            textAlign: "center",
            maxWidth: 400,
            mx: "auto",
            lineHeight: 1.6,
            fontSize: "15px"
          }}
        >
          AcademiaFlow streamlines administrative hurdles, empowering educators and students to focus on what matters most: excellence in learning.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthBanner;
