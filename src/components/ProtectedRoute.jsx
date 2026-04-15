import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their respective dashboard if they try to access a forbidden path
        if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
        if (user.role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
        if (user.role === "student") return <Navigate to="/student-dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
