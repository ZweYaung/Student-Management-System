import React, { useEffect, useState } from "react";

const ViewStudentModal = ({ isOpen, onClose, student }) => {
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

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Backdrop */}
            <div
                className={`fixed inset-0 transition-all duration-300 ${
                    isAnimating
                        ? "bg-black/50 backdrop-blur-sm"
                        : "bg-black/0 backdrop-blur-none"
                }`}
                onClick={onClose}
            ></div>

            {/* Modal */}
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
                                <i className="fas fa-user"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Student Details
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Complete student information
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

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Profile Section */}
                        <div className="flex items-center gap-6 pb-6 border-b border-slate-200/80">
                            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-4xl text-slate-500 overflow-hidden ring-4 ring-white shadow-lg">
                                {student?.profile_picture ? (
                                    <img
                                        src={`/profilePictures/${student.profile_picture}`}
                                        alt={student?.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <i className="fas fa-user"></i>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {student?.name || "N/A"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {student?.email || "No email provided"}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                            student?.gender === "male"
                                                ? "bg-blue-50 text-blue-700"
                                                : "bg-pink-50 text-pink-700"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                student?.gender === "male"
                                                    ? "bg-blue-500"
                                                    : "bg-pink-500"
                                            }`}
                                        ></span>
                                        {student?.gender === "male"
                                            ? "Male"
                                            : "Female"}
                                    </span>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        Score: {student?.score || 0}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-user-circle text-blue-500"></i>
                                Personal Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Full Name
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-medium">
                                        {student?.name || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Email Address
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.email || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Gender
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 capitalize">
                                        {student?.gender || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Score
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-semibold">
                                        {student?.score !== null &&
                                        student?.score !== undefined
                                            ? `${student.score}%`
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Phone Number
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.phone || "Not provided"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Date of Birth
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.date_of_birth
                                            ? new Date(
                                                  student.date_of_birth,
                                              ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="border-t border-slate-200/80 pt-6">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <i className="fas fa-graduation-cap text-blue-500"></i>
                                Academic Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Grade/Class
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.grade || "Not assigned"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Section
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.section || "Not assigned"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Admission Date
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.admission_date
                                            ? new Date(
                                                  student.admission_date,
                                              ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "Not provided"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Academic Year
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.academic_year || "Not set"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        {student?.address && (
                            <div className="border-t border-slate-200/80 pt-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <i className="fas fa-location-dot text-blue-500"></i>
                                    Address
                                </h4>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-sm text-slate-800 whitespace-pre-line">
                                        {student.address}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Guardian Information */}
                        {(student?.guardian_name ||
                            student?.guardian_phone ||
                            student?.guardian_email) && (
                            <div className="border-t border-slate-200/80 pt-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <i className="fas fa-user-tie text-blue-500"></i>
                                    Guardian Information
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {student?.guardian_name && (
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <p className="text-xs text-slate-500 font-medium">
                                                Guardian Name
                                            </p>
                                            <p className="text-sm text-slate-800 mt-0.5">
                                                {student.guardian_name}
                                            </p>
                                        </div>
                                    )}
                                    {student?.guardian_phone && (
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <p className="text-xs text-slate-500 font-medium">
                                                Guardian Phone
                                            </p>
                                            <p className="text-sm text-slate-800 mt-0.5">
                                                {student.guardian_phone}
                                            </p>
                                        </div>
                                    )}
                                    {student?.guardian_email && (
                                        <div className="bg-slate-50 rounded-lg p-3 sm:col-span-2">
                                            <p className="text-xs text-slate-500 font-medium">
                                                Guardian Email
                                            </p>
                                            <p className="text-sm text-slate-800 mt-0.5">
                                                {student.guardian_email}
                                            </p>
                                        </div>
                                    )}
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
                                        Student ID
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-mono">
                                        #
                                        {String(student?.id || "N/A").padStart(
                                            4,
                                            "0",
                                        )}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Joined On
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {student?.created_at
                                            ? new Date(
                                                  student.created_at,
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
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                            >
                                <i className="fas fa-edit"></i>
                                Edit Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentModal;
