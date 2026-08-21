// resources/js/Pages/Dashboard/Index.jsx
import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddStudentModal from "@/Components/AddStudentModal";
import AddTeacherModal from "@/Components/AddTeacherModal";
import AddCourseModal from "@/Components/AddCourseModal";
import { useState } from "react";

export default function Dashboard({
    stats,
    recentStudents,
    recentTeachers,
    upcomingEvents,
    scoreDistribution,
    genderDistribution,
}) {
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

    const handleSuccess = () => {
        window.location.reload();
    };

    return (
        <DashboardLayout title="Dashboard">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Total Students
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.total_students}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                                <i className="fas fa-users"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            {stats.student_growth > 0 ? (
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i> +
                                    {stats.student_growth}%
                                </span>
                            ) : stats.student_growth < 0 ? (
                                <span className="text-red-600 font-medium">
                                    <i className="fas fa-arrow-down mr-0.5"></i>{" "}
                                    {stats.student_growth}%
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
                                    Teachers
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.total_teachers}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            {stats.teacher_growth > 0 ? (
                                <span className="text-emerald-600 font-medium">
                                    <i className="fas fa-arrow-up mr-0.5"></i> +
                                    {stats.teacher_growth}%
                                </span>
                            ) : stats.teacher_growth < 0 ? (
                                <span className="text-red-600 font-medium">
                                    <i className="fas fa-arrow-down mr-0.5"></i>{" "}
                                    {stats.teacher_growth}%
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
                                    Courses
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.total_courses}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg">
                                <i className="fas fa-book-open"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Active courses
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Avg. Score
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.average_score}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg">
                                <i className="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Overall average
                            </span>
                        </div>
                    </div>
                </div>

                {/* Charts + Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Score Distribution Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-slate-700">
                                Score Distribution
                            </h2>
                            <span className="text-xs text-slate-400">
                                All students
                            </span>
                        </div>
                        <div className="space-y-3">
                            {Object.entries(scoreDistribution).map(
                                ([range, count]) => {
                                    const total = Object.values(
                                        scoreDistribution,
                                    ).reduce((a, b) => a + b, 0);
                                    const percentage =
                                        total > 0 ? (count / total) * 100 : 0;
                                    const colors = {
                                        "0-20": "bg-red-500",
                                        "21-40": "bg-orange-500",
                                        "41-60": "bg-yellow-500",
                                        "61-80": "bg-blue-500",
                                        "81-100": "bg-emerald-500",
                                    };
                                    return (
                                        <div
                                            key={range}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="text-xs font-medium text-slate-600 w-12">
                                                {range}
                                            </span>
                                            <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${colors[range]} transition-all duration-500`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-700 w-8 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                        <p className="text-xs text-slate-400 mt-4 text-center">
                            * Score distribution across all students
                        </p>
                    </div>

                    {/* Recent Students */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                        <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <i className="fas fa-clock text-blue-500 text-xs"></i>
                            Recent Students
                        </h2>
                        <ul className="space-y-3">
                            {recentStudents.length > 0 ? (
                                recentStudents.map((student) => (
                                    <li
                                        key={student.id}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {student.name}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">
                                                {student.created_at
                                                    ? new Date(
                                                          student.created_at,
                                                      ).toLocaleDateString()
                                                    : "Recent"}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-medium ${student.score >= 70 ? "text-emerald-600" : "text-amber-600"}`}
                                        >
                                            {student.score}%
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">
                                    No students yet
                                </p>
                            )}
                        </ul>
                        <Link
                            href="/students"
                            className="text-xs text-blue-600 hover:underline mt-3 inline-block"
                        >
                            View all students →
                        </Link>
                    </div>
                </div>

                {/* Quick Actions + Additional Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                        <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <i className="fas fa-bolt text-blue-500 text-xs"></i>
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setIsStudentModalOpen(true)}
                                className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg px-3 py-2.5 transition text-sm"
                            >
                                <i className="fas fa-user-plus"></i>
                                Add Student
                            </button>
                            <button
                                onClick={() => setIsTeacherModalOpen(true)}
                                className="flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-lg px-3 py-2.5 transition text-sm"
                            >
                                <i className="fas fa-chalkboard-teacher"></i>
                                Add Teacher
                            </button>
                            <button
                                onClick={() => setIsCourseModalOpen(true)}
                                className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg px-3 py-2.5 transition text-sm"
                            >
                                <i className="fas fa-book"></i>
                                Add Course
                            </button>
                            <Link
                                href="/schedule"
                                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg px-3 py-2.5 transition text-sm"
                            >
                                <i className="fas fa-calendar-alt"></i>
                                Schedule
                            </Link>
                        </div>
                    </div>

                    {/* Gender Distribution Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                        <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <i className="fas fa-venus-mars text-blue-500 text-xs"></i>
                            Gender Distribution
                        </h2>
                        <div className="flex items-center justify-center h-[120px]">
                            <div className="flex items-end gap-8 h-full">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="bg-blue-500 rounded-t-lg transition-all duration-500"
                                        style={{
                                            height:
                                                genderDistribution.total > 0
                                                    ? `${(genderDistribution.male / genderDistribution.total) * 100}%`
                                                    : "0%",
                                            minHeight: "20px",
                                            width: "60px",
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium text-slate-600 mt-2">
                                        Male
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {genderDistribution.male}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div
                                        className="bg-pink-500 rounded-t-lg transition-all duration-500"
                                        style={{
                                            height:
                                                genderDistribution.total > 0
                                                    ? `${(genderDistribution.female / genderDistribution.total) * 100}%`
                                                    : "0%",
                                            minHeight: "20px",
                                            width: "60px",
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium text-slate-600 mt-2">
                                        Female
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {genderDistribution.female}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-xs text-slate-400 mt-4">
                            {genderDistribution.total > 0 ? (
                                <>
                                    {Math.round(
                                        (genderDistribution.male /
                                            genderDistribution.total) *
                                            100,
                                    )}
                                    % male ·
                                    {Math.round(
                                        (genderDistribution.female /
                                            genderDistribution.total) *
                                            100,
                                    )}
                                    % female
                                </>
                            ) : (
                                "No data available"
                            )}
                        </div>
                    </div>

                    {/* Course Enrollment / Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                        <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <i className="fas fa-calendar-alt text-blue-500 text-xs"></i>
                            Upcoming Events
                        </h2>
                        <ul className="space-y-2">
                            {upcomingEvents && upcomingEvents.length > 0 ? (
                                upcomingEvents.slice(0, 4).map((event) => (
                                    <li
                                        key={event.id}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {event.title}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">
                                                {event.teacher_name || "TBD"}
                                            </p>
                                        </div>
                                        <span className="text-xs text-slate-500 ml-2">
                                            {event.start_time}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">
                                    No upcoming events
                                </p>
                            )}
                        </ul>
                        <Link
                            href="/schedule"
                            className="text-xs text-blue-600 hover:underline mt-3 inline-block"
                        >
                            View full schedule →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddStudentModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                onSuccess={handleSuccess}
            />
            <AddTeacherModal
                isOpen={isTeacherModalOpen}
                onClose={() => setIsTeacherModalOpen(false)}
                onSuccess={handleSuccess}
            />
            <AddCourseModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </DashboardLayout>
    );
}
