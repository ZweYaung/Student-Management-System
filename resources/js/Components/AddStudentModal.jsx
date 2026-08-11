import React, { useEffect, useState } from "react";

const AddStudentModal = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        // Reset file input
        const fileInput = document.getElementById("profile_image");
        if (fileInput) {
            fileInput.value = "";
        }
    };

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
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4"
                    }`}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                                <i className="fas fa-user-plus"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Add New Student
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Fill in the details to add a new student
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

                    {/* Form */}
                    <form className="p-6 space-y-6">
                        {/* Profile Picture */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-image text-blue-500 text-xs"></i>
                                Profile Picture
                            </h3>
                            <div className="flex items-center gap-6">
                                {/* Image Preview */}
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Profile preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <i className="fas fa-user text-3xl text-slate-300"></i>
                                                <p className="text-[10px] text-slate-400 mt-1">
                                                    No image
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {previewImage && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>

                                {/* File Input */}
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Upload Photo
                                    </label>
                                    <input
                                        id="profile_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        Supported: JPG, PNG, WEBP (Max 2MB)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200/80"></div>

                        {/* Personal Information */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-user text-blue-500 text-xs"></i>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Full Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Gender{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white">
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Score{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter score (0-100)"
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200/80"></div>

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-address-card text-blue-500 text-xs"></i>
                                Additional Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Grade/Class
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 10th Grade"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Section
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., A, B"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200/80"></div>

                        {/* Address - Simplified (just address field) */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-location-dot text-blue-500 text-xs"></i>
                                Address
                            </h3>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Address
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Enter full address"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="border-t border-slate-200/80"></div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-user-tie text-blue-500 text-xs"></i>
                                Guardian Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Guardian Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter guardian name"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Guardian Phone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter guardian phone"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Guardian Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter guardian email"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Student Status */}
                        <div className="border-t border-slate-200/80"></div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-circle-check text-blue-500 text-xs"></i>
                                Status
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Admission Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Academic Year
                                    </label>
                                    <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white">
                                        <option value="">
                                            Select academic year
                                        </option>
                                        <option value="2023-2024">
                                            2023-2024
                                        </option>
                                        <option value="2024-2025">
                                            2024-2025
                                        </option>
                                        <option value="2025-2026">
                                            2025-2026
                                        </option>
                                    </select>
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
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                            >
                                <i className="fas fa-plus"></i>
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudentModal;
