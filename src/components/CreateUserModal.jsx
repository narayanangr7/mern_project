import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Fade,
    FormHelperText,
    CircularProgress
} from "@mui/material";
import {
    Close as CloseIcon,
    PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../api/adminApi";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().oneOf(["admin", "teacher", "student"], "Invalid role").required("Role is required"),
    department: Yup.string().when("role", {
        is: "student",
        then: () => Yup.string().required("Department is required for students"),
        otherwise: () => Yup.string().nullable()
    })
});

const CreateUserModal = ({ open, onClose, onUserCreated }) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "",
            department: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                await createUser(values);
                resetForm();
                onUserCreated();
                onClose();
            } catch (err) {
                setStatus(err.response?.data?.message || "Something went wrong. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Fade}
            transitionDuration={350}
            PaperProps={{
                className: "rounded-3xl shadow-2xl overflow-hidden",
            }}
            BackdropProps={{
                className: "bg-[#1E1B4B]/40 backdrop-blur-sm",
            }}
        >
            <DialogTitle className="flex items-center justify-between bg-gradient-to-br from-purple-600 to-purple-800 text-white px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <PersonAddIcon />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl leading-tight">Create New User</h3>
                        <p className="text-xs text-purple-100/80 mt-1 font-medium tracking-wide">
                            Add a new member to the campus command center
                        </p>
                    </div>
                </div>
                <IconButton
                    onClick={handleClose}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={formik.handleSubmit}>
                <DialogContent className="px-8 pt-8 pb-4">
                    {formik.status && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
                            {formik.status}
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-5 mt-2">
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Full Name"
                            variant="outlined"
                            placeholder="e.g. Dr. Sarah Jenkins"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#F9FAFB' } }}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            placeholder="e.g. sarah@academia.edu"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#F9FAFB' } }}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Temporary Password"
                            type="password"
                            variant="outlined"
                            placeholder="••••••••"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#F9FAFB' } }}
                        />

                        <FormControl 
                            fullWidth 
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#F9FAFB' } }}
                        >
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Role"
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                            </Select>
                            {formik.touched.role && formik.errors.role && (
                                <FormHelperText>{formik.errors.role}</FormHelperText>
                            )}
                        </FormControl>

                        {formik.values.role === "student" && (
                            <FormControl 
                                fullWidth 
                                error={formik.touched.department && Boolean(formik.errors.department)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#F9FAFB' } }}
                            >
                                <InputLabel id="dept-label">Department</InputLabel>
                                <Select
                                    labelId="dept-label"
                                    id="department"
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Department"
                                >
                                    <MenuItem value="CSE">CSE</MenuItem>
                                    <MenuItem value="ECE">ECE</MenuItem>
                                    <MenuItem value="EEE">EEE</MenuItem>
                                    <MenuItem value="MECH">MECH</MenuItem>
                                    <MenuItem value="CIVIL">CIVIL</MenuItem>
                                    <MenuItem value="IT">IT</MenuItem>
                                </Select>
                                {formik.touched.department && formik.errors.department && (
                                    <FormHelperText>{formik.errors.department}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    </div>
                </DialogContent>

                <DialogActions className="px-8 pb-8 pt-4 gap-3">
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, px: 4, py: 1.5, borderColor: '#E5E7EB', color: '#6B7280' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                        sx={{ 
                            borderRadius: "12px", 
                            textTransform: "none", 
                            fontWeight: 600, 
                            px: 4, 
                            py: 1.5, 
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #6C2BD9 100%)',
                            '&:hover': { background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)' }
                        }}
                    >
                        {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Create User"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateUserModal;
