import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../layouts/AdminDashboard";
import DashboardContent from "../pages/DashboardContent";
import UserManagement from "../pages/UserManagement";
import NoticeManagement from "../pages/NoticeManagement";
// import Login from "../pages/Login"; // Optional if login page is unused as per history

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="*" element={<DashboardContent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
