import { createBrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "../layouts/AdminDashboard";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import DashboardContent from "../pages/DashboardContent";
import UserManagement from "../pages/UserManagement";
import NoticeManagement from "../pages/NoticeManagement";
import Login from "../pages/Login";
import Result from "../pages/Student/Result";
import AdminResult from "../pages/AdminResult";
import TeacherDashboard from "../pages/Teacher Dashboard/TeacherDashboard";
import MarksEntry from "../pages/Teacher Dashboard/MarksEntry";
import TeacherNotice from "../pages/Teacher Dashboard/TeacherNotice";
import StudentDashboardContent from "../pages/Student/StudentDashboardContent";
import StudyMaterials from "../pages/Teacher Dashboard/StudyMaterials";
import NoticeStudent from "../pages/Student/NoticeStudent";
import StudyMaterialStudent from "../pages/Student/StudyMaterialStudent";
import ProtectedRoute from "../components/ProtectedRoute";

const MainRedirect = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
  if (user.role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
  if (user.role === "student") return <Navigate to="/student-dashboard" replace />;
  return <Navigate to="/login" replace />;
};

const MainRouter = {
  path: "/",
  children: [
    {
      path: "/",
      element: <MainRedirect />,
    },
    // Admin Routes
    {
      path: "/admin-dashboard",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <DashboardContent /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "notice", element: <NoticeManagement /> },
        { path: "Adminresult", element: <AdminResult /> },
      ],
    },
    // Teacher Routes
    {
      path: "/teacher-dashboard",
      element: (
        <ProtectedRoute allowedRoles={["teacher"]}>
          <TeacherDashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <TeacherDashboard /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "mark-entry", element: <MarksEntry /> },
        { path: "notice", element: <TeacherNotice /> },
        { path: "study-materials", element: <StudyMaterials /> },
      ],
    },
    // Student Routes
    {
      path: "/student-dashboard",
      element: (
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentDashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <StudentDashboardContent /> },
        { path: "materials", element: <StudyMaterialStudent /> },
        { path: "notices", element: <NoticeStudent /> },
        { path: "result", element: <Result /> },
      ],
    },
    // Unauthenticated / Basic Auth Setup (If present)
    {
      path: "/login",
      element: <Login />,
    },
  ],
};

export default MainRouter;
