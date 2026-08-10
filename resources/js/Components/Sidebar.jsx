// Sidebar.jsx – static UI component, no logic
import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

const Sidebar = () => {
    return (
        <aside className="sidebar w-[260px] min-w-[260px] bg-slate-800 text-slate-300 flex flex-col h-full overflow-y-auto">
            {/* Brand */}
            <div className="px-6 py-5 border-b border-slate-700/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/30">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                <span className="text-white text-xl font-semibold tracking-tight">
                    Academy<span className="text-blue-400">Hub</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mt-2 mb-3 font-semibold">
                    Main
                </p>

                {/* <Link
                    href="#"
                    className="sidebar-link active flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white"
                >
                    <i className="fas fa-th-large w-5 text-center text-blue-400"></i>
                    <span>Dashboard</span>
                </Link> */}
                <Link
                    href={route("students.index")}
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-user-graduate w-5 text-center text-slate-500"></i>
                    <span>Students</span>
                    <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                        18
                    </span>
                </Link>
                <a
                    href={route("teachers.index")}
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-chalkboard-teacher w-5 text-center text-slate-500"></i>
                    <span>Teachers</span>
                    <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                        8
                    </span>
                </a>
                {/* <a
                    href="#"
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-book-open w-5 text-center text-slate-500"></i>
                    <span>Courses</span>
                </a>
                <a
                    href="#"
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-calendar-alt w-5 text-center text-slate-500"></i>
                    <span>Schedule</span>
                </a>

                <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mt-6 mb-3 font-semibold">
                    System
                </p>

                <a
                    href="#"
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-cog w-5 text-center text-slate-500"></i>
                    <span>Settings</span>
                </a>
                <a
                    href="#"
                    className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white"
                >
                    <i className="fas fa-question-circle w-5 text-center text-slate-500"></i>
                    <span>Help</span>
                </a> */}
            </nav>

            {/* User profile */}
            <div className="border-t border-slate-700/60 px-4 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-slate-600">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                        John Doe
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                        admin@academy.com
                    </p>
                </div>
                <button className="text-slate-400 hover:text-white transition">
                    <i className="fas fa-sign-out-alt text-sm"></i>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
