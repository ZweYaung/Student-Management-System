import { Link, usePage, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";
import AddStudentModal from "@/Components/AddStudentModal";

export default function Students({ students, filters }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [gender, setGender] = useState(filters?.gender || "all");
    const [score_range, setScoreRange] = useState(filters?.score_range || "");

    const handleFilterChange = (key, value) => {
        if (key === "gender") {
            setGender(value);
        } else if (key === "score_range") {
            setScoreRange(value);
        }

        const newFilters = { ...filters };

        if (value && value !== "all" && value !== "") {
            newFilters[key] = value;
        } else {
            delete newFilters[key];
        }

        router.get("/students", newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ["students", "filters"],
        });
    };

    return (
        <DashboardLayout>
            <main className="flex-1 overflow-y-auto bg-[#f1f5f9]">
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
                            <select
                                className="text-sm border appearance-none pr-8 border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                                value={gender}
                                onChange={(e) =>
                                    handleFilterChange("gender", e.target.value)
                                }
                            >
                                <option value="all">All genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select
                                className="text-sm appearance-none pr-8 border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                                value={score_range}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "score_range",
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="">All scores</option>
                                <option value="0-20">0 – 20</option>
                                <option value="21-40">21 – 40</option>
                                <option value="41-60">41 – 60</option>
                                <option value="61-80">61 – 80</option>
                                <option value="81-100">81 – 100</option>
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
                            <button
                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                                onClick={() => setModalOpen(true)}
                            >
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
                                    {students.data.map((student, index) => (
                                        <tr className="table-row-hover transition">
                                            <td className="px-4 py-3 text-slate-500 font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-800">
                                                {student.name}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">
                                                {student.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${student.gender == "male" ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"}`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${student.gender == "male" ? "bg-blue-500" : "bg-pink-500"}`}
                                                    ></span>
                                                    {student.gender}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                    {student.score}
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
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-4 py-3.5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40">
                            <p className="text-sm text-slate-500">
                                Showing{" "}
                                <span className="font-medium text-slate-700">
                                    {students.from}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium text-slate-700">
                                    {students.to}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-slate-700">
                                    {students.total}
                                </span>{" "}
                                results
                            </p>
                            <div className="flex items-center gap-1.5">
                                {/* Previous Page */}
                                <Link
                                    href={students.prev_page_url || "#"}
                                    className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${
                                        !students.prev_page_url
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={!students.prev_page_url}
                                >
                                    <i className="fas fa-chevron-left text-xs"></i>
                                </Link>

                                {/* Page Numbers */}
                                {students.links.map((link, index) => {
                                    // Skip "Previous" and "Next" links
                                    if (
                                        link.label === "&laquo; Previous" ||
                                        link.label === "Next &raquo;"
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition ${
                                                link.active
                                                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    );
                                })}

                                {/* Next Page */}
                                <Link
                                    href={students.next_page_url || "#"}
                                    className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${
                                        !students.next_page_url
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={!students.next_page_url}
                                >
                                    <i className="fas fa-chevron-right text-xs"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <AddStudentModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                </div>
            </main>
        </DashboardLayout>
    );
}
