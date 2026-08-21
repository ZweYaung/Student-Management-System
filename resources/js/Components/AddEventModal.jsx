import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const AddEventModal = ({
    isOpen,
    onClose,
    onSuccess,
    mode = "add",
    eventData = null,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        course_name: "",
        teacher_name: "",
        location: "",
        date: "",
        start_time: "",
        end_time: "",
        color: "blue",
        status: "scheduled",
    });

    const colors = [
        { value: "blue", label: "Blue", class: "bg-blue-500" },
        { value: "green", label: "Green", class: "bg-green-500" },
        { value: "purple", label: "Purple", class: "bg-purple-500" },
        { value: "amber", label: "Amber", class: "bg-amber-500" },
        { value: "pink", label: "Pink", class: "bg-pink-500" },
        { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
        { value: "red", label: "Red", class: "bg-red-500" },
        { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
    ];

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });

            if (mode === "edit" && eventData) {
                setFormData({
                    title: eventData.title || "",
                    course_name: eventData.course_name || "",
                    teacher_name: eventData.teacher_name || "",
                    location: eventData.location || "",
                    date: eventData.date || "",
                    start_time: eventData.start_time || "",
                    end_time: eventData.end_time || "",
                    color: eventData.color || "blue",
                    status: eventData.status || "scheduled",
                });
            } else {
                // Set default date to today
                const today = new Date().toISOString().split("T")[0];
                setFormData({
                    title: "",
                    course_name: "",
                    teacher_name: "",
                    location: "",
                    date: today,
                    start_time: "",
                    end_time: "",
                    color: "blue",
                    status: "scheduled",
                });
            }

            setErrors({});
            setLoading(false);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, mode, eventData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = { ...formData };

        if (mode === "edit" && eventData) {
            router.put(`/schedule/${eventData.id}`, data, {
                onSuccess: () => {
                    setLoading(false);
                    onClose();
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                },
            });
        } else {
            router.post("/schedule", data, {
                onSuccess: () => {
                    setLoading(false);
                    onClose();
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                },
            });
        }
    };

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
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4"
                    }`}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                                <i className="fas fa-calendar-plus"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    {mode === "edit"
                                        ? "Edit Event"
                                        : "Add New Event"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {mode === "edit"
                                        ? "Update the event details"
                                        : "Schedule a new event"}
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

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Event Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Math 101"
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc] ${
                                    errors.title
                                        ? "border-red-500"
                                        : "border-slate-200"
                                }`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Course & Teacher */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    name="course_name"
                                    value={formData.course_name}
                                    onChange={handleChange}
                                    placeholder="Mathematics 101"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Teacher
                                </label>
                                <input
                                    type="text"
                                    name="teacher_name"
                                    value={formData.teacher_name}
                                    onChange={handleChange}
                                    placeholder="Dr. Sarah Johnson"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc] ${
                                        errors.date
                                            ? "border-red-500"
                                            : "border-slate-200"
                                    }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Start Time{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc] ${
                                        errors.start_time
                                            ? "border-red-500"
                                            : "border-slate-200"
                                    }`}
                                />
                                {errors.start_time && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.start_time}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Room 201"
                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                            />
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                color: color.value,
                                            })
                                        }
                                        className={`w-8 h-8 rounded-full ${color.class} ${
                                            formData.color === color.value
                                                ? "ring-2 ring-offset-2 ring-blue-500"
                                                : ""
                                        } transition`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white"
                            >
                                <option value="scheduled">Scheduled</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200/80">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        {mode === "edit"
                                            ? "Updating..."
                                            : "Adding..."}
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save"></i>
                                        {mode === "edit"
                                            ? "Update Event"
                                            : "Add Event"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
