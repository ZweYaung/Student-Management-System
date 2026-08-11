import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";

export default function DashboardLayout({ children, title, subtitle }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Close dropdowns when clicking outside
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (showProfile) setShowProfile(false);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
        if (showNotifications) setShowNotifications(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main className="flex-1 flex flex-col min-h-screen bg-slate-50 overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10 px-6 py-3.5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-slate-800">
                            {title || "Students"}
                        </h1>
                        {subtitle && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                                {subtitle}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Search Box */}
                        <div className="relative">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/80 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                            />
                        </div>

                        {/* 🔔 Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={toggleNotifications}
                                className="relative text-slate-500 hover:text-slate-700 transition p-1.5 hover:bg-slate-100 rounded-lg"
                            >
                                <i className="fas fa-bell text-lg"></i>
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() =>
                                            setShowNotifications(false)
                                        }
                                    ></div>
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden z-20">
                                        <div className="px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-slate-800">
                                                Notifications
                                            </h3>
                                            <button className="text-xs text-blue-600 hover:underline">
                                                Mark all read
                                            </button>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <div className="px-4 py-3 hover:bg-slate-50 transition border-b border-slate-200/80">
                                                <p className="text-sm text-slate-800">
                                                    New student added: John Doe
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    5 minutes ago
                                                </p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-slate-50 transition border-b border-slate-200/80">
                                                <p className="text-sm text-slate-800">
                                                    Score updated: Jane Smith
                                                    (92)
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    1 hour ago
                                                </p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-slate-50 transition">
                                                <p className="text-sm text-slate-800">
                                                    Upcoming: Math 101 class
                                                    tomorrow
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    3 hours ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 border-t border-slate-200/80 text-center">
                                            <a
                                                href="#"
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                View all notifications
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 👤 User Avatar - Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold ring-2 ring-white shadow-sm hover:bg-slate-300 transition"
                            >
                                JD
                            </button>

                            {/* Profile Dropdown */}
                            {showProfile && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowProfile(false)}
                                    ></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden z-20">
                                        <div className="px-4 py-3 border-b border-slate-200/80">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                                    JD
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">
                                                        John Doe
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        admin@academy.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <i className="fas fa-user text-slate-400 w-4"></i>
                                                <span>My Profile</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <i className="fas fa-cog text-slate-400 w-4"></i>
                                                <span>Settings</span>
                                            </a>
                                            <hr className="my-1 border-slate-200/80" />
                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                <i className="fas fa-sign-out-alt text-red-400 w-4"></i>
                                                <span>Logout</span>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <section className="flex-1 overflow-y-auto p-6">
                    {children}
                </section>

                {/* Footer */}
                <p className="text-xs text-slate-400 text-center py-2 shrink-0">
                    © 2026 AcademyHub — All rights reserved.
                </p>
            </main>
        </div>
    );
}
