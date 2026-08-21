import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import { router, Link, usePage } from "@inertiajs/react";

export default function DashboardLayout({
    children,
    title,
    subtitle,
    search,
    onSearchChange,
    onClearSearch,
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [toast, setToast] = useState(null);

    const { url, component } = usePage();
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    // Get current route name from URL
    const getCurrentRoute = () => {
        if (!url) return "dashboard";
        const path = url.split("?")[0];
        const segments = path.split("/").filter(Boolean);
        return segments[0] || "dashboard";
    };

    const currentRoute = getCurrentRoute();

    // Pages where search bar should be shown
    const showSearchRoutes = ["teachers", "students", "courses", "schedule"];
    const shouldShowSearch = showSearchRoutes.includes(currentRoute);

    // Show toast when flash message exists
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: "success" });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: "error" });
        } else if (flash?.warning) {
            setToast({ message: flash.warning, type: "warning" });
        } else if (flash?.info) {
            setToast({ message: flash.info, type: "info" });
        }
    }, [flash]);

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleLogout = () => {
        router.post("/logout");
    };

    // Toast color and icon based on type
    const toastColors = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
    };

    const toastIcons = {
        success: "fa-check-circle",
        error: "fa-exclamation-circle",
        warning: "fa-exclamation-triangle",
        info: "fa-info-circle",
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Toast Message */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div
                        className={`${toastColors[toast.type] || "bg-green-500"} text-white px-6 py-4 rounded-lg shadow-lg max-w-md flex items-center gap-3`}
                    >
                        <i
                            className={`fas ${toastIcons[toast.type] || "fa-check-circle"} text-xl`}
                        ></i>
                        <p className="text-sm font-medium">{toast.message}</p>
                        <button
                            onClick={() => setToast(null)}
                            className="ml-4 text-white hover:text-gray-200 transition"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}

            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                user={user}
            />
            <main className="flex-1 flex flex-col min-h-screen bg-slate-50 overflow-hidden">
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
                        {shouldShowSearch && (
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search || ""}
                                    onChange={(e) =>
                                        onSearchChange &&
                                        onSearchChange(e.target.value)
                                    }
                                    className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/80 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                />
                                {search && onClearSearch && (
                                    <button
                                        onClick={onClearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* User Avatar - Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold ring-2 ring-white shadow-sm hover:bg-slate-300 transition"
                            >
                                {user?.name?.charAt(0).toUpperCase()}
                            </button>

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
                                                    {user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <Link
                                                href={route("profile.index")}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <i className="fas fa-user w-5 text-center text-slate-500"></i>
                                                <span>Profile</span>
                                            </Link>
                                            <hr className="my-1 border-slate-200/80" />
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                <i className="fas fa-sign-out-alt text-red-400 w-4"></i>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto p-6">
                    {children}
                </section>

                <p className="text-xs text-slate-400 text-center py-2 shrink-0">
                    © 2026 AcademyHub — All rights reserved.
                </p>
            </main>
        </div>
    );
}
