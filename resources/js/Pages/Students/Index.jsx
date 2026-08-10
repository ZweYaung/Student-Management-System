// Students.jsx
import Sidebar from "@/components/Sidebar";

export default function Students() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto bg-[#f1f5f9]">
                {/* Top Nav */}
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

                {/* Page Content */}
                <div className="p-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Students
                                    </p>
                                    <p className="text-2xl font-bold text-slate-800 mt-1">
                                        18
                                    </p>
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs">
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i>{" "}
                                    +12%
                                </span>
                                <span className="text-slate-400">
                                    from last month
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Average Score
                                    </p>
                                    <p className="text-2xl font-bold text-slate-800 mt-1">
                                        43.7
                                    </p>
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs">
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i>{" "}
                                    +5.2%
                                </span>
                                <span className="text-slate-400">
                                    from last month
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Male / Female
                                    </p>
                                    <p className="text-2xl font-bold text-slate-800 mt-1">
                                        8 / 10
                                    </p>
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                                    <i className="fas fa-venus-mars"></i>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs">
                                <span className="text-slate-400">
                                    44% male · 56% female
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Top Score
                                    </p>
                                    <p className="text-2xl font-bold text-slate-800 mt-1">
                                        86
                                    </p>
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg">
                                    <i className="fas fa-trophy"></i>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs">
                                <span className="text-slate-400">
                                    Edgardo Marquardt
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Filters + Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400">
                                <option>All genders</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400">
                                <option>All scores</option>
                                <option>0 – 20</option>
                                <option>21 – 40</option>
                                <option>41 – 60</option>
                                <option>61 – 80</option>
                                <option>81 – 100</option>
                            </select>
                            <button className="text-sm text-slate-500 hover:text-slate-700 px-2 py-1.5 transition">
                                <i className="fas fa-sliders-h mr-1"></i> More
                                filters
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-2 bg-white transition hover:bg-slate-50">
                                <i className="fas fa-download mr-1.5"></i>{" "}
                                Export
                            </button>
                            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2">
                                <i className="fas fa-plus"></i> Add Student
                            </button>
                        </div>
                    </div>

                    {/* Student Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-left">
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                            Gender
                                        </th>
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                            Score
                                        </th>
                                        <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {/* Row 1 */}
                                    <tr className="table-row-hover transition">
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            1
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            Alfonzo Shanahan
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            toconnell@example.org
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                Male
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                8
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="table-row-hover transition">
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            2
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            Prof. Jasper Hartmann I
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            schoolalter.tyler@example.com
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                                                Female
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                42
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="table-row-hover transition">
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            3
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            Iyah Wiza
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            buckridge.arno@example.com
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                                                Female
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                28
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="table-row-hover transition">
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            4
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            Mr. Jarrod Johnston DDS
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            alisha.waelchi@example.com
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                                                Female
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-emerald-100 text-emerald-700 font-semibold text-sm">
                                                69
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="table-row-hover transition">
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            5
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            Nathanael Flatley
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            concepcion.murazik@example.org
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                Male
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                35
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-4 py-3.5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40">
                            <p className="text-sm text-slate-500">
                                Showing{" "}
                                <span className="font-medium text-slate-700">
                                    1
                                </span>{" "}
                                to{" "}
                                <span className="font-medium text-slate-700">
                                    10
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-slate-700">
                                    18
                                </span>{" "}
                                results
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    disabled
                                >
                                    <i className="fas fa-chevron-left text-xs"></i>
                                </button>
                                <button className="px-3.5 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium shadow-sm shadow-blue-600/20">
                                    1
                                </button>
                                <button className="px-3.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-600 hover:bg-slate-50 transition">
                                    2
                                </button>
                                <button className="px-3.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-600 hover:bg-slate-50 transition">
                                    3
                                </button>
                                <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition">
                                    <i className="fas fa-chevron-right text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-slate-400 text-center py-2">
                        © 2026 AcademyHub — All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}
