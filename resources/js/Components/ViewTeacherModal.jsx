import React, { useEffect, useState } from "react";

const ViewTeacherModal = ({ isOpen, onClose, teacher, openEditModal }) => {
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
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Teacher Details
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Complete teacher information
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
                        {/* Profile Section */}
                        <div className="flex items-center gap-6 pb-6 border-b border-slate-200/80">
                            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-4xl text-slate-500 overflow-hidden ring-4 ring-white shadow-lg">
                                {teacher?.profile_picture ? (
                                    <img
                                        src={`/profilePictures/${teacher.profile_picture}`}
                                        alt={teacher?.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <i className="fas fa-user"></i>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {teacher?.name || "N/A"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {teacher?.email || "No email provided"}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                            teacher?.gender === "male"
                                                ? "bg-blue-50 text-blue-700"
                                                : "bg-pink-50 text-pink-700"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                teacher?.gender === "male"
                                                    ? "bg-blue-500"
                                                    : "bg-pink-500"
                                            }`}
                                        ></span>
                                        {teacher?.gender === "male"
                                            ? "Male"
                                            : "Female"}
                                    </span>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {teacher?.department || "No Department"}
                                    </span>
                                    <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                        {teacher?.experience || 0} years
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
                                        {teacher?.name || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Email Address
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {teacher?.email || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Gender
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 capitalize">
                                        {teacher?.gender || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Department
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {teacher?.department || "Not assigned"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Experience
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {teacher?.experience || 0} years
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Phone
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5">
                                        {teacher?.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        {teacher?.address && (
                            <div className="border-t border-slate-200/80 pt-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <i className="fas fa-location-dot text-blue-500"></i>
                                    Address
                                </h4>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-sm text-slate-800 whitespace-pre-line">
                                        {teacher.address}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        {teacher?.bio && (
                            <div className="border-t border-slate-200/80 pt-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <i className="fas fa-address-card text-blue-500"></i>
                                    Bio
                                </h4>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-sm text-slate-800 whitespace-pre-line">
                                        {teacher.bio}
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
                                        Teacher ID
                                    </p>
                                    <p className="text-sm text-slate-800 mt-0.5 font-mono">
                                        #
                                        {String(teacher?.id || "N/A").padStart(
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
                                        {teacher?.created_at
                                            ? new Date(
                                                  teacher.created_at,
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
                                onClick={() => openEditModal(teacher)}
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                            >
                                <i className="fas fa-edit"></i>
                                Edit Teacher
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTeacherModal;
