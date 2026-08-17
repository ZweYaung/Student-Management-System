import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddCourseModal from "@/Components/AddCourseModal";
import ViewCourseModal from "@/Components/ViewCourseModal";
import DeleteCourseModal from "@/Components/DeleteCourseModal";
import { useState, useEffect } from "react";

export default function Courses({ courses, filters, stats, teachers }) {
    const [status, setStatus] = useState(filters?.status || "all");
    const [department, setDepartment] = useState(filters?.department || "all");
    const [search, setSearch] = useState(filters?.search || "");
    const [debouncedSearch, setDebouncedSearch] = useState(
        filters?.search || "",
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

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
    const openEditModal = (course) => {
        setIsEditModalOpen(true);
        setCourseToEdit(course);
    };

    const handleDeleteCourse = (course) => {
        setIsDeleteModalOpen(true);
        setCourseToDelete(course);
    };

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
        setIsViewModalOpen(true);
    };

    const handleFilterChange = (key, value) => {
        if (key === "status") setStatus(value);
        if (key === "department") setDepartment(value);
        if (key === "search") setSearch(value);

        const newFilters = { ...filters };
        if (value && value !== "all" && value !== "") {
            newFilters[key] = value;
        } else {
            delete newFilters[key];
        }

        router.get("/courses", newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ["courses", "filters", "stats"],
        });
    };

    const handleClearSearch = () => {
        setSearch("");
        handleFilterChange("search", "");
    };

    const handleSuccess = () => window.location.reload();

    const getStatusBadge = (status) => {
        const colors = {
            active: "bg-emerald-50 text-emerald-700",
            archived: "bg-slate-100 text-slate-600",
            draft: "bg-amber-50 text-amber-700",
        };
        return colors[status] || "bg-slate-100 text-slate-600";
    };

    return (
        <DashboardLayout
            title="Courses"
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
                                    Total Courses
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                                <i className="fas fa-book"></i>
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
                                    Active
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg">
                                <i className="fas fa-check-circle"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Currently running
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Archived
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.archived}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center text-lg">
                                <i className="fas fa-archive"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">Past courses</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Enrollments
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.enrollments}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                                <i className="fas fa-users"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Total students enrolled
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <select
                            className="text-sm border appearance-none pr-8 border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                            value={status}
                            onChange={(e) =>
                                handleFilterChange("status", e.target.value)
                            }
                        >
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                            <option value="draft">Draft</option>
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
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openCreateModal}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                        >
                            <i className="fas fa-plus"></i> Add Course
                        </button>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-left">
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        Course Name
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        Teachers
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Credits
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Students
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Status
                                    </th>
                                    <th className="px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {courses.data.map((course, index) => (
                                    <tr
                                        key={course.id}
                                        className="table-row-hover transition"
                                    >
                                        <td className="px-4 py-3 text-slate-500 font-medium">
                                            {courses.from + index}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            {course.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 font-mono">
                                            {course.code}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            {course.teachers &&
                                            course.teachers.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {course.teachers.map(
                                                        (teacher) => (
                                                            <span
                                                                key={teacher.id}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                                                            >
                                                                {teacher.name}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 text-xs">
                                                    No teachers
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {course.department || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {course.credits}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {course.current_students || 0}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(course.status)}`}
                                            >
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() =>
                                                        handleViewCourse(course)
                                                    }
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition"
                                                >
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openEditModal(course)
                                                    }
                                                    className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition"
                                                >
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCourse(
                                                            course,
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
                                {courses.from}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-slate-700">
                                {courses.to}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-slate-700">
                                {courses.total}
                            </span>{" "}
                            results
                        </p>
                        <div className="flex items-center gap-1.5">
                            {/* Previous Page - Added preserveState, preserveScroll, only */}
                            <Link
                                href={courses.prev_page_url || "#"}
                                className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${!courses.prev_page_url ? "opacity-40 cursor-not-allowed" : ""}`}
                                disabled={!courses.prev_page_url}
                                preserveState
                                preserveScroll
                                only={[
                                    "courses",
                                    "filters",
                                    "stats",
                                    "teachers",
                                ]}
                            >
                                <i className="fas fa-chevron-left text-xs"></i>
                            </Link>

                            {/* Page Numbers - Added preserveState, preserveScroll, only */}
                            {courses.links.map((link, index) => {
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
                                        preserveState
                                        preserveScroll
                                        only={[
                                            "courses",
                                            "filters",
                                            "stats",
                                            "teachers",
                                        ]}
                                    />
                                );
                            })}

                            {/* Next Page - Added preserveState, preserveScroll, only */}
                            <Link
                                href={courses.next_page_url || "#"}
                                className={`px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-500 hover:bg-slate-50 transition ${!courses.next_page_url ? "opacity-40 cursor-not-allowed" : ""}`}
                                disabled={!courses.next_page_url}
                                preserveState
                                preserveScroll
                                only={[
                                    "courses",
                                    "filters",
                                    "stats",
                                    "teachers",
                                ]}
                            >
                                <i className="fas fa-chevron-right text-xs"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                teachers={teachers}
            />
            <ViewCourseModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                course={selectedCourse}
                openEditModal={openEditModal}
            />
            <DeleteCourseModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                courseId={courseToDelete?.id}
                courseName={courseToDelete?.name}
            />
            <AddCourseModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setCourseToEdit(null);
                }}
                teachers={teachers}
                onSuccess={handleSuccess}
                mode="edit"
                courseData={courseToEdit}
            />
        </DashboardLayout>
    );
}
