import React from "react";
import Sidebar from '../../components/TeacherSidebar'
import { Box } from "@mui/material";


function Result() {
  return (
    <>
    <Sidebar/>
      <Box
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.5px",
          mb: 0.5,
          color: "#3529da",
        }}
      >
        Welcome back, Result{"    "}
      </Box>
    </>
  );
}

export default Result;
