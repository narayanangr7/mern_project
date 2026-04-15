import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { getNotices, deleteNotice } from "../../api/noticeApi";

const TeacherNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchNotices();
  }, []);

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
          Campus Notices
        </h2>
        <p className="text-gray-500 text-sm">
          Stay updated with the latest institutional announcements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <CircularProgress color="primary" />
          </div>
        ) : notices.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-400">
            No notices found.
          </div>
        ) : (
          notices.map((notice) => (
            <Card
              key={notice._id}
              className="rounded-[24px] border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full border border-teal-100 uppercase tracking-wider">
                    Broadcast
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
                      By {notice.createdBy?.name || "Admin"}
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

export default TeacherNotice;
