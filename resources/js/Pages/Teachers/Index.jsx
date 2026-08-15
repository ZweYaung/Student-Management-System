// resources/js/Pages/Teachers/Index.jsx
import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddTeacherModal from "@/Components/AddTeacherModal";
import ViewTeacherModal from "@/Components/ViewTeacherModal";
import DeleteTeacherModal from "@/Components/DeleteTeacherModal";
import { useState, useEffect } from "react";

export default function Teachers({ teachers, filters, stats }) {
    const [gender, setGender] = useState(filters?.gender || "all");
    const [department, setDepartment] = useState(filters?.department || "all");
    const [experienceRange, setExperienceRange] = useState(
        filters?.experience_range || "",
    );
    const [search, setSearch] = useState(filters?.search || "");
    const [debouncedSearch, setDebouncedSearch] = useState(
        filters?.search || "",
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (debouncedSearch !== filters?.search) {
            handleFilterChange("search", debouncedSearch);
        }
    }, [debouncedSearch]);

    const openCreateModal = () => setIsModalOpen(true);
    const openEditModal = (teacher) => {
        setIsEditModalOpen(true);
        setTeacherToEdit(teacher);
    };

    const handleDeleteTeacher = (teacher) => {
        setIsDeleteModalOpen(true);
        setTeacherToDelete(teacher);
    };

    const handleViewTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsViewModalOpen(true);
    };

    const handleFilterChange = (key, value) => {
        if (key === "gender") setGender(value);
        if (key === "department") setDepartment(value);
        if (key === "experience_range") setExperienceRange(value);
        if (key === "search") setSearch(value);

        const newFilters = { ...filters };
        if (value && value !== "all" && value !== "") {
            newFilters[key] = value;
        } else {
            delete newFilters[key];
        }

        router.get("/teachers", newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ["teachers", "filters", "stats"],
        });
    };

    const handleClearSearch = () => {
        setSearch("");
        handleFilterChange("search", "");
    };

    const handleSuccess = () => window.location.reload();

    return (
        <DashboardLayout
            title="Teachers"
            subtitle={`${stats.total || 0} records`}
            search={search}
            onSearchChange={(value) => setSearch(value)}
            onClearSearch={handleClearSearch}
        >
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Total Teachers
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            {stats.percentage_change > 0 ? (
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i> +
                                    {stats.percentage_change}%
                                </span>
                            ) : stats.percentage_change < 0 ? (
                                <span className="text-red-600 font-medium">
                                    <i className="fas fa-arrow-down mr-0.5"></i>{" "}
                                    {stats.percentage_change}%
                                </span>
                            ) : (
                                <span className="text-slate-400 font-medium">
                                    <i className="fas fa-minus mr-0.5"></i> 0%
                                </span>
                            )}
                            <span className="text-slate-400">
                                from last month
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Male / Female
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.male} / {stats.female}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                                <i className="fas fa-venus-mars"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                {stats.total > 0
                                    ? Math.round(
                                          (stats.male / stats.total) * 100,
                                      )
                                    : 0}
                                % male ·{" "}
                                {stats.total > 0
                                    ? Math.round(
                                          (stats.female / stats.total) * 100,
                                      )
                                    : 0}
                                % female
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Avg. Experience
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.avg_experience} yrs
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg">
                                <i className="fas fa-clock"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            {stats.avg_experience_change > 0 ? (
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i> +
                                    {stats.avg_experience_change}%
                                </span>
                            ) : stats.avg_experience_change < 0 ? (
                                <span className="text-red-600 font-medium">
                                    <i className="fas fa-arrow-down mr-0.5"></i>{" "}
                                    {stats.avg_experience_change}%
                                </span>
                            ) : (
                                <span className="text-slate-400 font-medium">
                                    <i className="fas fa-minus mr-0.5"></i> 0%
                                </span>
                            )}
                            <span className="text-slate-400">
                                from last month
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Departments
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {teachers.data
                                        .map((t) => t.department)
                                        .filter((v, i, a) => a.indexOf(v) === i)
                                        .length || 0}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg">
                                <i className="fas fa-building"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
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
                            className="text-sm border appearance-none pr-8 border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                            value={department}
                            onChange={(e) =>
                                handleFilterChange("department", e.target.value)
                            }
                        >
                            <option value="all">All departments</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                            <option value="Arts">Arts</option>
                            <option value="Physical Education">
                                Physical Education
                            </option>
                            <option value="Computer Science">
                                Computer Science
                            </option>
                        </select>

                        <select
                            value={experienceRange}
                            onChange={(e) =>
                                handleFilterChange(
                                    "experience_range",
                                    e.target.value,
                                )
                            }
                            className="text-sm appearance-none pr-8 border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                        >
                            <option value="">All experience</option>
                            <option value="0-5">0 – 5 years</option>
                            <option value="6-10">6 – 10 years</option>
                            <option value="11-15">11 – 15 years</option>
                            <option value="16-20">16 – 20 years</option>
                            <option value="21+">21+ years</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openCreateModal}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                        >
                            <i className="fas fa-plus"></i> Add Teacher
                        </button>
                    </div>
                </div>

                {/* Teacher Table */}
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
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Experience
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {teachers.data.map((teacher, index) => (
                                    <tr
                                        key={teacher.id}
                                        className="table-row-hover transition"
                                    >
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            {teachers.from + index}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            {teacher.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            {teacher.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    teacher.gender === "male"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "bg-pink-50 text-pink-700"
                                                }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        teacher.gender ===
                                                        "male"
                                                            ? "bg-blue-500"
                                                            : "bg-pink-500"
                                                    }`}
                                                ></span>
                                                {teacher.gender === "male"
                                                    ? "Male"
                                                    : "Female"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                                                {teacher.department ||
                                                    "Not assigned"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-7 rounded-md bg-slate-100 text-slate-700 font-semibold text-sm">
                                                {teacher.experience}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() =>
                                                        handleViewTeacher(
                                                            teacher,
                                                        )
                                                    }
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition"
                                                >
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openEditModal(teacher)
                                                    }
                                                    className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition"
                                                >
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteTeacher(
                                                            teacher,
                                                        )
                                                    }
                                                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition"
                                                >
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
                                {teachers.from}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-slate-700">
                                {teachers.to}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-slate-700">
                                {teachers.total}
                            </span>{" "}
                            results
                        </p>
                        <div className="flex items-center gap-1.5">
                            <Link
                                href={teachers.prev_page_url || "#"}
                                className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${!teachers.prev_page_url ? "opacity-40 cursor-not-allowed" : ""}`}
                                disabled={!teachers.prev_page_url}
                            >
                                <i className="fas fa-chevron-left text-xs"></i>
                            </Link>
                            {teachers.links.map((link, index) => {
                                if (
                                    link.label === "&laquo; Previous" ||
                                    link.label === "Next &raquo;"
                                )
                                    return null;
                                return (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition ${link.active ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                );
                            })}
                            <Link
                                href={teachers.next_page_url || "#"}
                                className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${!teachers.next_page_url ? "opacity-40 cursor-not-allowed" : ""}`}
                                disabled={!teachers.next_page_url}
                            >
                                <i className="fas fa-chevron-right text-xs"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddTeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
            <ViewTeacherModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                teacher={selectedTeacher}
                openEditModal={openEditModal}
            />
            <DeleteTeacherModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                teacherId={teacherToDelete?.id}
                teacherName={teacherToDelete?.name}
            />
            <AddTeacherModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setTeacherToEdit(null);
                }}
                onSuccess={handleSuccess}
                mode="edit"
                teacherData={teacherToEdit}
            />
        </DashboardLayout>
    );
}
