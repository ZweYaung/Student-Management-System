import React, { useEffect, useState } from "react";

const ViewCourseModal = ({ isOpen, onClose, course, openEditModal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-emerald-50 text-emerald-700";
            case "archived":
                return "bg-slate-100 text-slate-600";
            case "draft":
                return "bg-amber-50 text-amber-700";
            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Backdrop */}
            <div
                className={`fixed inset-0 transition-all duration-300 ${
                    isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"
                }`}
                onClick={onClose}
            ></div>

            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4"
                    }`}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                                <i className="fas fa-book-open"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Course Details
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Complete course information
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Course Header */}
                        <div className="pb-6 border-b border-slate-200/80">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">
                                        {course?.name || "N/A"}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-mono mt-1">
                                        Code: {course?.code || "N/A"}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                        course?.status,
                                    )}`}
                                >
                                    {course?.status || "N/A"}
                                </span>
                            </div>
                        </div>

                        {/* Course Information */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-info-circle text-blue-500"></i>
                                Course Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Course Name
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-medium">
                                        {course?.name || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Course Code
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-mono">
                                        {course?.code || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Credits
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.credits || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Department
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.department || "Not assigned"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Teachers */}
                        <div className="border-t border-slate-200/80 pt-6">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-chalkboard-teacher text-blue-500"></i>
                                Teachers
                            </h4>
                            <div className="bg-slate-50 rounded-lg p-3">
                                {course?.teachers &&
                                course.teachers.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {course.teachers.map((teacher) => (
                                            <span
                                                key={teacher.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                                            >
                                                {teacher.name}
                                                {teacher.pivot?.role && (
                                                    <span className="text-xs text-slate-400">
                                                        ({teacher.pivot.role})
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No teachers assigned
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Enrollment */}
                        <div className="border-t border-slate-200/80 pt-6">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-users text-blue-500"></i>
                                Enrollment
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Max Students
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.max_students || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Current Students
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.current_students || 0}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3 sm:col-span-2">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Availability
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.max_students
                                            ? `${course.max_students - (course.current_students || 0)} spots available`
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {course?.description && (
                            <div className="border-t border-slate-200/80 pt-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <i className="fas fa-align-left text-blue-500"></i>
                                    Description
                                </h4>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-sm text-slate-800 whitespace-pre-line">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t border-slate-200/80 pt-6">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-info-circle text-blue-500"></i>
                                Additional Info
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Course ID
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-mono">
                                        #
                                        {String(course?.id || "N/A").padStart(
                                            4,
                                            "0",
                                        )}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Created On
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {course?.created_at
                                            ? new Date(
                                                  course.created_at,
                                              ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="sticky bottom-0 bg-white border-t border-slate-200/80 px-6 py-4 -mx-6 -mb-6 rounded-b-2xl flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => openEditModal(course)}
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                            >
                                <i className="fas fa-edit"></i>
                                Edit Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCourseModal;
