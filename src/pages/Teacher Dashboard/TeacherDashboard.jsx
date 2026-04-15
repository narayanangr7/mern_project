import React from 'react'
import { Box, Typography, Breadcrumbs, Paper } from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import { getStats } from '../../api/userApi'

const TeacherDashboard = () => {
  const [studentCount, setStudentCount] = React.useState(0);
  const [notices, setNotices] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getStats();
        setStudentCount(stats.data.students);
        
        const noticeRes = await import("../../api").then(m => m.NoticeAPI.get("/"));
        setNotices(noticeRes.data.slice(0, 4));
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ animation: "fadeIn 0.8s ease-out" }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: "16px", opacity: 0.5 }} />}
            sx={{ mb: 1.5, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}
          >
            <Typography color="text.secondary" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>School Management</Typography>
            <Typography color="primary" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>Instructor Dashboard</Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-1px", mb: 0.5, color: "#1E1B4B" }}>
            Welcome, <Box component="span" sx={{ color: "#7C3AED" }}>Prof. {user.name}</Box>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, gap: 3 }}>
        {/* Real Stats Card */}
        <Paper elevation={0} sx={{ 
          p: 4, 
          borderRadius: "24px", 
          bgcolor: "white", 
          border: "1px solid #E5E7EB", 
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}>
          <Typography sx={{ color: "#6B7280", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", mb: 2, letterSpacing: "1px" }}>Total Active Students</Typography>
          <Typography variant="h2" sx={{ color: "#1E1B4B", fontWeight: 900, mb: 1 }}>{studentCount}</Typography>
          <Box sx={{ px: 2, py: 0.5, bgcolor: "#ECFDF5", borderRadius: "20px", border: "1px solid #A7F3D0" }}>
             <Typography sx={{ color: "#059669", fontSize: "12px", fontWeight: 700 }}>Live System Data</Typography>
          </Box>
        </Paper>

        {/* Real Notices Card */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", bgcolor: "#fff", border: "1px solid #E5E7EB" }}>
           <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Platform Notifications</Typography>
           <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              {notices.length > 0 ? notices.map((notice, i) => (
                <Box key={i} sx={{ p: 2, borderRadius: "16px", bgcolor: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                   <Typography sx={{ fontWeight: 700, color: "#1E1B4B", fontSize: "14px", mb: 0.5 }}>{notice.title}</Typography>
                   <Typography sx={{ fontSize: "12px", color: "#6B7280", mb: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.content}</Typography>
                   <Typography sx={{ fontSize: "10px", color: "#9CA3AF", fontWeight: 700 }}>{new Date(notice.createdAt).toLocaleDateString()}</Typography>
                </Box>
              )) : (
                <Typography sx={{ color: "#9CA3AF", fontStyle: "italic" }}>No new notifications.</Typography>
              )}
           </Box>
        </Paper>
      </Box>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }` }} />
    </Box>
  );
};

export default TeacherDashboard
