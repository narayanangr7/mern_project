import React, { useState } from "react";
import {  Card, CardContent, IconButton, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
  Refresh as RefreshIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  NavigateNext as NavigateNextIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { getNotices, postNotice, deleteNotice } from "../api/noticeApi";

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await getNotices();
      setNotices(response.data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNotices();
  }, []);

  const handlePostNotice = async () => {
    if (!title || !description || !date) {
      alert("All fields are required");
      return;
    }

    try {
      await postNotice({ title, description, date });
      setTitle("");
      setDescription("");
      setDate("");
      fetchNotices();
    } catch (err) {
      alert("Failed to post notice: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteNotice(id);
        fetchNotices();
      } catch (err) {
        alert("Failed to delete notice: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="pb-10">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-[#1E1B4B] mb-2 tracking-tight flex items-center gap-2">
          Notice Management
        </h2>
        <p className="text-gray-500 text-sm">
          Create institutional announcements for all users.
        </p>
      </div>

      <div className="flex flex-col items-center mb-16">
        <div className="w-full max-w-4xl">
          <div className="bg-[#FAFAFD] border border-dashed border-purple-300 rounded-[32px] p-8 shadow-inner">
            <Card className="rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <TextField
                    label="Notice Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  <TextField
                    label="Notice Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </div>

                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' }, mb: 4 }}
                />

                <div className="flex justify-end">
                  <Button 
                    variant="contained" 
                    onClick={handlePostNotice}
                    sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 6, py: 1.5, background: 'linear-gradient(135deg, #8B5CF6 0%, #6C2BD9 100%)' }}
                  >
                    Broadcast Notice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#1E1B4B] mb-6 tracking-tight">
        Published Notices
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {loading ? (
            <div className="col-span-full text-center py-10 text-gray-400">Loading notices...</div>
        ) : notices.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-400">No notices found.</div>
        ) : (
          notices.map((notice) => (
            <Card
              key={notice._id}
              className="rounded-[24px] border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full border border-purple-100 uppercase tracking-wider">
                    Official
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {notice.date}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#1E1B4B] mb-3 leading-snug">
                  {notice.title}
                </h4>
                <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed line-clamp-4">
                  {notice.description}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-600">
                      {notice.createdBy?.name?.charAt(0) || "A"}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Post by {notice.createdBy?.name || "Admin"}
                    </span>
                  </div>
                  <IconButton size="small" color="error" onClick={() => handleDeleteNotice(notice._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticeManagement;
