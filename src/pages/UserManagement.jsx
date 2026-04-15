import React, { useState } from "react";
import {
    Breadcrumbs,
    InputBase,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Zoom,
    Fade,
    IconButton,
    Avatar,
    Button
} from "@mui/material";
import {
    Add as AddIcon,
    NavigateNext as NavigateNextIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    PersonAdd as PersonAddIcon,
    FilterList as FilterListIcon,
    Edit as EditIcon,
    DeleteOutline as DeleteIcon,
    MoreHoriz as MoreIcon,
    FileDownload as ExportIcon,
    CheckCircleOutline as ApproveIcon,
} from "@mui/icons-material";
import { getUsers } from "../api/userApi";
import { approveUser, deleteUser } from "../api/adminApi";
import CreateUserModal from "../components/CreateUserModal";

const departments = [
    "Computer Science",
    "Data Science",
    "Information Tech",
    "Software Eng",
    "Administrative",
];

const initialFormState = {
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    address: "",
};

const mockUsers = [
    { id: 1, name: "Dr. Sarah Jenkins", email: "s.jenkins@academia.edu", role: "admin", department: "Computer Science", status: "online", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Prof. Michael Chen", email: "m.chen@academia.edu", role: "teacher", department: "Data Science", status: "offline", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Alex Rodriguez", email: "alex.r@student.edu", role: "student", department: "Information Tech", status: "online", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Dr. Elena Gilbert", email: "e.gilbert@academia.edu", role: "teacher", department: "Software Eng", status: "away", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "James Wilson", email: "j.wilson@admin.edu", role: "admin", department: "Administrative", status: "online", avatar: "https://i.pravatar.cc/150?u=5" },
];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddUser, setOpenAddUser] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            // Filter out current user
            setUsers(response.data.filter(u => u._id !== currentUser.id));
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveUser(id);
            fetchUsers();
        } catch (err) {
            alert("Approval failed: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (err) {
                alert("Deletion failed: " + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleOpenAddUser = () => setOpenAddUser(true);
    const handleCloseAddUser = () => setOpenAddUser(false);

    const getRoleStyle = (role) => {
        if (role === "admin") return "bg-purple-100 text-purple-700";
        if (role === "teacher") return "bg-emerald-100 text-emerald-700";
        return "bg-gray-100 text-gray-600";
    };

    const getStatusColor = (status) => {
        if (status === "online") return "bg-emerald-500";
        if (status === "offline") return "bg-gray-400";
        if (status === "away") return "bg-amber-500";
        return "bg-gray-400";
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-[#1E1B4B] mb-2 tracking-tight">
                        User Management
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Manage, authorize, and oversee all campus accounts from a unified command center.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    <ExportIcon className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Toolbar Area */}
            <div className="flex gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-200">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-purple-500 focus-within:bg-white transition-all">
                    <SearchIcon className="text-gray-400 mr-2 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or employee ID..."
                        className="w-full bg-transparent outline-none text-sm py-3"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                    <FilterListIcon className="w-5 h-5" />
                    All Departments
                    <NavigateNextIcon className="rotate-90 w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-[2.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                    <span className="text-sm font-bold text-gray-500">Name & Contact</span>
                    <span className="text-sm font-bold text-gray-500">Role</span>
                    <span className="text-sm font-bold text-gray-500">Department</span>
                    <span className="text-sm font-bold text-gray-500">System Status</span>
                    <span className="text-sm font-bold text-gray-500 text-right">Actions</span>
                </div>

                {/* Table Body */}
                <div className="flex flex-col">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 font-medium">Loading user command center...</div>
                    ) : users.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 font-medium">No users found.</div>
                    ) : (
                        users.map((user, index) => (
                            <div
                                key={user._id}
                                className={`grid grid-cols-[2.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors ${index !== users.length - 1 ? "border-b border-gray-200" : ""
                                    }`}
                            >
                                {/* Name & Contact */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar className="w-10 h-10 border border-gray-100 shadow-sm bg-purple-500 text-white font-bold">
                                            {user.name?.charAt(0)}
                                        </Avatar>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1E1B4B] text-sm">{user.name}</h4>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                            <span className="text-xs">✉</span> {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${getRoleStyle(user.role)}`}>
                                        {user.role}
                                    </span>
                                </div>

                                {/* Department */}
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-purple-100/50 text-purple-600 flex items-center justify-center text-sm">
                                        🏫
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">{user.department || "General"}</span>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${user.isApproved ? "bg-emerald-500" : "bg-amber-500"}`} />
                                    <span className="text-sm text-gray-500 capitalize">{user.isApproved ? "Approved" : "Pending"}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 justify-end">
                                    {!user.isApproved && (
                                        <IconButton 
                                            size="small" 
                                            title="Approve User"
                                            className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50"
                                            onClick={() => handleApprove(user._id)}
                                        >
                                            <ApproveIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                    <IconButton 
                                        size="small" 
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination placeholder */}
                <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50/50">
                    <span className="text-sm text-gray-500">Showing 5 of 1,248 active users</span>
                    <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-400 hover:text-gray-600 px-2 font-medium">Previous</button>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm font-bold shadow-sm cursor-pointer">1</div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 text-sm hover:bg-gray-200 transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 text-sm hover:bg-gray-200 transition-colors">3</button>
                        <button className="text-sm text-gray-700 hover:text-gray-900 px-2 font-medium">Next</button>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <Zoom in={!openAddUser}>
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={handleOpenAddUser}
                        className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <AddIcon />
                    </button>
                </div>
            </Zoom>

            {/* Create User Modal Dialog */}
            <CreateUserModal
                open={openAddUser}
                onClose={handleCloseAddUser}
                onUserCreated={fetchUsers}
            />
        </div>
    );
};

export default UserManagement;
