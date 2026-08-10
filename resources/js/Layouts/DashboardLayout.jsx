import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";

export default function DashboardLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            ></Sidebar>
            <main className="flex-1 flex flex-col min-h-screen bg-slate-50">
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10 px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-slate-800">
                            Students
                        </h1>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                            18 records
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/80 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                            />
                        </div>
                        <button className="relative text-slate-500 hover:text-slate-700 transition">
                            <i className="fas fa-bell text-lg"></i>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold ring-2 ring-white shadow-sm">
                            JD
                        </div>
                    </div>
                </header>
                <section className="flex-1 overflow-y-auto">{children}</section>
                <p className="text-xs text-slate-400 text-center py-2">
                    © 2026 AcademyHub — All rights reserved.
                </p>
            </main>
        </div>
    );
}
