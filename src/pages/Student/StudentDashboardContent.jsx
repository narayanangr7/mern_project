import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  EmojiEvents as EmojiEventsIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Business as BusinessIcon
} from "@mui/icons-material";
import { getNotices } from "../../api/noticeApi";
import { getResults } from "../../api/resultApi";
import { MarkAPI } from "../../api";

const StudentDashboardContent = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [notices, setNotices] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [latestMark, setLatestMark] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticeRes, markRes, resultRes] = await Promise.all([
          getNotices(),
          MarkAPI.get("/"),
          getResults()
        ]);
        setNotices(noticeRes.data.slice(0, 3));
        setResults(resultRes.data);
        if (markRes.data.length > 0) {
          setLatestMark(markRes.data[0]); 
        }
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (      
    <Box sx={{ animation: "fadeIn 0.8s ease-out" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-1px",
            mb: 0.5,
            color: "#1E1B4B",
          }}
        >
          Welcome,{" "}
          <Box component="span" sx={{ color: "#6C2BD9" }}>
            {user.name}
          </Box>
        </Typography>
        <Typography sx={{ fontSize: "15px", color: "#6B7280", fontWeight: 500 }}>
          Here is the latest from your academic portal.
        </Typography>
      </Box>

      {/* Student Details Card */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", background: "#fff", border: "1px solid #E5E7EB", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E1B4B", mb: 3 }}>My Profile</Typography>
        <Grid container spacing={4}>
           <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                 <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "#E0F2FE", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0 }}>
                    <PersonIcon sx={{ color: "#0EA5E9", ml: 1.5 }} />
                 </Box>
                 <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" }}>Full Name</Typography>
                    <Typography sx={{ fontWeight: 600, color: "#1E1B4B" }}>{user.name}</Typography>
                 </Box>
              </Box>
           </Grid>
           <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                 <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "#FEF3C7", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0 }}>
                    <EmailIcon sx={{ color: "#D97706", ml: 1.5 }} />
                 </Box>
                 <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" }}>Email Address</Typography>
                    <Typography sx={{ fontWeight: 600, color: "#1E1B4B" }}>{user.email}</Typography>
                 </Box>
              </Box>
           </Grid>
           <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                 <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "#DCFCE7", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0 }}>
                    <BusinessIcon sx={{ color: "#059669", ml: 1.5 }} />
                 </Box>
                 <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" }}>Department</Typography>
                    <Typography sx={{ fontWeight: 600, color: "#1E1B4B" }}>{user.department || "Not Assigned"}</Typography>
                 </Box>
              </Box>
           </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3, mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Results Comparison / Summary Section */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", background: "#fff", border: "1px solid #E5E7EB" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E1B4B", mb: 3 }}>My Academic Performance</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {results.length > 0 ? results.map((res, idx) => (
                <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: "16px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <EmojiEventsIcon sx={{ color: "#F59E0B" }} />
                    <Typography sx={{ fontWeight: 600 }}>Exam Result</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#6C2BD9" }}>{res.score}</Typography>
                </Box>
              )) : (
                <Typography variant="body2" sx={{ color: "#6B7280", fontStyle: "italic" }}>No exam results published yet.</Typography>
              )}
            </Box>
          </Paper>

          {/* Real Latest Result Card */}
          {latestMark && (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
                color: "#fff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
               <Box sx={{ zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                  <EmojiEventsIcon sx={{ color: "#2DD4BF", fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#2DD4BF", textTransform: "uppercase" }}>Class Participation Score</Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>{latestMark.subject}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Instructor: {latestMark.teacher?.name}</Typography>
               </Box>

               <Box sx={{ textAlign: "center", zIndex: 1, bgcolor: "rgba(255,255,255,0.1)", p: 3, borderRadius: "20px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#2DD4BF", textTransform: "uppercase", mb: 0.5 }}>Score</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900 }}>{latestMark.marks}</Typography>
               </Box>
            </Paper>
          )}
        </Box>

        {/* Notice Board Area */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", background: "#fff", border: "1px solid #E5E7EB" }}>
           <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E1B4B", mb: 3 }}>Campus Notices</Typography>
           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {notices.length > 0 ? notices.map((notice, idx) => (
                <Box key={idx} sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <EventIcon sx={{ color: "#7C3AED", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "#1E1B4B", fontSize: "15px", lineHeight: 1.2, mb: 0.5 }}>{notice.title}</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#6B7280", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.description}</Typography>
                    <Typography sx={{ fontSize: "11px", color: "#9CA3AF", mt: 0.5, fontWeight: 600 }}>{notice.date}</Typography>
                  </Box>
                </Box>
              )) : (
                <Typography sx={{ color: "#9CA3AF", fontStyle: "italic", fontSize: "14px" }}>No active notices at the moment.</Typography>
              )}
           </Box>
        </Paper>
      </Box>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </Box>
  );
};

export default StudentDashboardContent;
