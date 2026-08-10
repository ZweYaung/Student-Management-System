import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    // Get the current component name or URL path from Inertia
    const { component, url } = usePage();

    // Helper to check if link matches current route or component
    const isActive = (routeName, componentName) => {
        return (
            component.startsWith(componentName) ||
            url.startsWith(route(routeName, {}, false))
        );
    };
    return (
        <aside
            className={`bg-slate-800 text-slate-300 flex flex-col h-full transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-[260px]"
            }`}
        >
            {/* Brand Header & Toggle Button */}
            <div className="px-4 py-5 border-b border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                    {!isCollapsed && (
                        <>
                            <div className="w-9 h-9 min-w-[36px] rounded-xl bg-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/30">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <span className="text-white text-xl font-semibold tracking-tight whitespace-nowrap">
                                Academy
                                <span className="text-blue-400">Hub</span>
                            </span>
                        </>
                    )}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition"
                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    {/* <i
                        className={`fas ${isCollapsed ? "fa-chevron-right" : "fa-chevron-left"} text-sm`}
                    ></i> */}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {!isCollapsed && (
                    <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mt-2 mb-3 font-semibold">
                        Main
                    </p>
                )}

                <Link
                    href={route("students.index")}
                    className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive("students.index", "Students")
                            ? "bg-slate-700/80 text-white border-l-4 border-blue-500 rounded-l-none pl-2.5"
                            : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                    title="Students"
                >
                    <i className="fas fa-user-graduate w-5 text-center text-slate-500"></i>
                    {!isCollapsed && (
                        <>
                            <span className="whitespace-nowrap">Students</span>
                            <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                                18
                            </span>
                        </>
                    )}
                </Link>

                <Link
                    href={route("teachers.index")}
                    className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive("teachers.index", "Teachers")
                            ? "bg-slate-700/80 text-white border-l-4 border-blue-500 rounded-l-none pl-2.5"
                            : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                    title="Teachers"
                >
                    <i className="fas fa-chalkboard-teacher w-5 text-center text-slate-500"></i>
                    {!isCollapsed && (
                        <>
                            <span className="whitespace-nowrap">Teachers</span>
                            <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                                8
                            </span>
                        </>
                    )}
                </Link>
            </nav>

            {/* User Profile */}
            <div className="border-t border-slate-700/60 px-4 py-4 flex items-center gap-3">
                <div className="w-9 h-9 min-w-[36px] rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-slate-600">
                    JD
                </div>
                {!isCollapsed && (
                    <>
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
                    </>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
