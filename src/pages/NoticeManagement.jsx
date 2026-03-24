import React, { useState } from "react";
import {
    Chip,
    Card,
    CardContent,
    IconButton,
    TextField,
    Button
} from "@mui/material";
import {
    Visibility as VisibilityIcon,
    Refresh as RefreshIcon,
    DesktopWindows as DesktopIcon,
    PhoneIphone as MobileIcon,
    AccessTime as TimeIcon,
    Person as PersonIcon,
    NavigateNext as NavigateNextIcon
} from "@mui/icons-material";

const recentAnnouncements = [
    {
        id: 1,
        type: "Exam",
        title: "Mid-Term Examination Schedule Released",
        content: "The mid-term examinations for the Fall 2024 semester will commence from October 15th. Please download the detailed timetable from...",
        date: "Sep 24, 2024",
        author: "ADMIN OFFICE",
    },
    {
        id: 2,
        type: "Event",
        title: "Annual Tech Symposium \"FutureFlow 2024\"",
        content: "Register now for the biggest tech event of the year. Featuring guest speakers from top tech firms and AI workshops.",
        date: "Sep 22, 2024",
        author: "STUDENT COUNCIL",
    },
    {
        id: 3,
        type: "General",
        title: "Maintenance Notice: Library Portal",
        content: "The library portal will be down for scheduled maintenance this Sunday from 2:00 AM to 6:00 AM.",
        date: "Sep 20, 2024",
        author: "IT DEPARTMENT",
    },
];

const NoticeManagement = () => {
    const [deviceView, setDeviceView] = useState("desktop");

    const getTypeStyle = (type) => {
        switch (type) {
            case "Exam": return "text-pink-500 border-pink-200 bg-pink-50/50";
            case "Event": return "text-sky-500 border-sky-200 bg-sky-50/50";
            case "General": return "text-purple-500 border-purple-200 bg-purple-50/50";
            default: return "text-gray-500 border-gray-200 bg-gray-50";
        }
    };

    return (
        <div className="pb-10">
            {/* Header */}
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-[#1E1B4B] mb-2 tracking-tight flex items-center gap-2">
                    Notice Management
                </h2>
                <p className="text-gray-500 text-sm flex items-center gap-3">
                    Draft, schedule, and broadcast institutional announcements.
                    <span className="px-3 py-1 bg-sky-50 text-sky-500 border border-sky-200 text-xs font-bold rounded-full">
                        Live Preview Enabled
                    </span>
                </p>
            </div>

            {/* Editor & Preview Area */}
            <div className="flex flex-col items-center mb-16">
                {/* Toggle Bar */}
                <div className="flex justify-between items-center w-full max-w-4xl mb-4">
                    <div className="flex items-center gap-2">
                        <VisibilityIcon className="text-gray-600 w-5 h-5" />
                        <span className="font-bold text-sm text-gray-700 tracking-wide">LIVE PREVIEW</span>
                    </div>
                    <div className="flex gap-6">
                        <button
                            onClick={() => setDeviceView('desktop')}
                            className={`font-bold text-xs tracking-wider transition-colors ${deviceView === 'desktop' ? 'text-[#1E1B4B]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            DESKTOP
                        </button>
                        <button
                            onClick={() => setDeviceView('mobile')}
                            className={`font-bold text-xs tracking-wider transition-colors ${deviceView === 'mobile' ? 'text-[#1E1B4B]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            MOBILE
                        </button>
                    </div>
                </div>

                {/* Editor Card */}
                <div className={`w-full transition-all duration-300 ease-in-out ${deviceView === 'desktop' ? 'max-w-4xl' : 'max-w-sm'}`}>
                    <div className="bg-[#FAFAFD] border border-dashed border-purple-300 rounded-[32px] p-8 shadow-inner">
                        <Card elevation={0} className="rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden">
                            <CardContent className="p-8">
                                <span className="inline-block px-3 py-1 mb-6 text-xs font-bold text-purple-600 border border-purple-200 rounded-full bg-purple-50">
                                    General
                                </span>

                                <TextField
                                    variant="standard"
                                    placeholder="Enter Notice Title..."
                                    fullWidth
                                    InputProps={{ disableUnderline: true, className: 'text-3xl font-bold text-[#1E1B4B] mb-4' }}
                                />

                                <TextField
                                    variant="standard"
                                    placeholder="Start typing your notice content here. This preview updates live to show how your announcement will appear to students and faculty."
                                    fullWidth
                                    multiline
                                    InputProps={{ disableUnderline: true, className: 'text-base text-gray-500 leading-relaxed min-h-[100px] mb-8' }}
                                />

                                <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                                    <div className="flex gap-8">
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wide">
                                            <TimeIcon className="w-4 h-4" /> OCT 03, 2024
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wide">
                                            <PersonIcon className="w-4 h-4" /> SYSTEM ADMINISTRATOR
                                        </span>
                                    </div>
                                    <button className="text-xs font-bold text-teal-500 hover:text-teal-600 uppercase tracking-widest transition-colors">
                                        READ MORE
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-center mt-6 text-xs font-bold text-gray-400 tracking-widest uppercase">
                            CHANGES ARE REFLECTED IN REAL-TIME AS YOU TYPE
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Announcements Filter */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2 tracking-tight">Recent Announcements</h3>
                    <p className="text-gray-500 text-sm">Manage and track your previously published notices.</p>
                </div>
                <div className="flex gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
                    <button className="px-6 py-2 rounded-full bg-teal-400 text-white font-bold text-sm shadow-[0_4px_14px_rgba(45,212,191,0.39)] hover:bg-teal-500 transition-all">All (12)</button>
                    <button className="px-6 py-2 rounded-full text-gray-500 font-semibold text-sm hover:bg-gray-200 transition-colors">Pinned (2)</button>
                    <button className="px-6 py-2 rounded-full text-gray-500 font-semibold text-sm hover:bg-gray-200 transition-colors">Scheduled (1)</button>
                </div>
            </div>

            {/* Announcements Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {recentAnnouncements.map((notice) => (
                    <Card key={notice.id} elevation={0} className="rounded-[24px] border border-gray-200 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer">
                        <CardContent className="flex-1 p-8 flex flex-col">
                            <span className={`inline-block self-start px-3 py-1 mb-5 text-[11px] font-extrabold uppercase tracking-wider border rounded-full ${getTypeStyle(notice.type)}`}>
                                {notice.type}
                            </span>
                            <h4 className="text-lg font-bold text-[#1E1B4B] mb-3 leading-snug group-hover:text-purple-700 transition-colors">
                                {notice.title}
                            </h4>
                            <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed">
                                {notice.content}
                            </p>
                            <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                                        <TimeIcon className="w-3.5 h-3.5" /> {notice.date}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                                        <PersonIcon className="w-3.5 h-3.5" /> {notice.author}
                                    </span>
                                </div>
                                <button className="text-xs font-extrabold text-teal-400 group-hover:text-teal-500 uppercase tracking-widest transition-colors self-end pb-1 pb-1">
                                    READ MORE
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load Archived Notices */}
            <div className="flex justify-center mb-16">
                <button className="text-sm font-bold text-gray-400 flex items-center justify-center gap-2 hover:text-purple-600 transition-colors py-2 px-4 rounded-xl hover:bg-purple-50 tracking-wider">
                    <RefreshIcon className="w-5 h-5" /> LOAD ARCHIVED NOTICES
                </button>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-[#F5EFFF] rounded-[32px] py-10 px-6 overflow-hidden">
                <div className="text-center border-r border-purple-500/10">
                    <h3 className="text-5xl font-extrabold text-purple-600 mb-2">124</h3>
                    <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">TOTAL NOTICES PUBLISHED</p>
                </div>
                <div className="text-center border-r border-purple-500/10">
                    <h3 className="text-5xl font-extrabold text-teal-400 mb-2">98%</h3>
                    <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">AVERAGE REACH RATE</p>
                </div>
                <div className="text-center">
                    <h3 className="text-5xl font-extrabold text-rose-500 mb-2">4</h3>
                    <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">SCHEDULED FOR OCT</p>
                </div>
            </div>

            {/* Footer link */}
            <div className="mt-8 flex justify-between items-center px-4">
                <button className="text-purple-700 font-bold hover:text-purple-800 transition-colors text-sm">
                    Notice Guidelines & Best Practices
                </button>
                <IconButton size="small" className="text-purple-700 hover:bg-purple-50">
                    <NavigateNextIcon className="rotate-90" />
                </IconButton>
            </div>
        </div>
    );
};

export default NoticeManagement;
