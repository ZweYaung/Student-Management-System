import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const AddTeacherModal = ({
    isOpen,
    onClose,
    onSuccess,
    mode = "add",
    teacherData = null,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageRemoved, setImageRemoved] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        department: "",
        experience: "",
        phone: "",
        address: "",
        bio: "",
        profile_picture: null,
    });

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });

            setImageRemoved(false);

            if (mode === "edit" && teacherData) {
                setFormData({
                    name: teacherData.name || "",
                    email: teacherData.email || "",
                    gender: teacherData.gender || "",
                    department: teacherData.department || "",
                    experience: teacherData.experience || "",
                    phone: teacherData.phone || "",
                    address: teacherData.address || "",
                    bio: teacherData.bio || "",
                    profile_picture: null,
                });

                if (teacherData.profile_picture) {
                    setPreviewImage(teacherData.profile_picture);
                }
            } else {
                setFormData({
                    name: "",
                    email: "",
                    gender: "",
                    department: "",
                    experience: "",
                    phone: "",
                    address: "",
                    bio: "",
                    profile_picture: null,
                });
                setPreviewImage(null);
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
    }, [isOpen, mode, teacherData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({ ...formData, profile_picture: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setFormData({ ...formData, profile_picture: null });
        setImageRemoved(true);
        const fileInput = document.getElementById("profile_image");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSelectChange = (e) => {
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

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (value === null || value === "" || value === undefined) return;

            if (key === "profile_picture") {
                if (value instanceof File) {
                    data.append("profile_picture", value);
                }
                return;
            }

            data.append(key, value);
        });

        if (mode === "edit" && imageRemoved) {
            data.append("remove_image", "true");
        }

        if (mode === "edit" && teacherData) {
            data.append("_method", "PUT");
            router.post(`/teachers/${teacherData.id}`, data, {
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
            router.post("/teachers", data, {
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
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    {mode === "edit"
                                        ? "Edit Teacher"
                                        : "Add New Teacher"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {mode === "edit"
                                        ? "Update the teacher's information below"
                                        : "Fill in the details to add a new teacher"}
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

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Profile Picture */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-image text-blue-500 text-xs"></i>
                                Profile Picture
                            </h3>
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
                                        {previewImage ? (
                                            <img
                                                src={
                                                    previewImage.startsWith(
                                                        "data:image",
                                                    )
                                                        ? previewImage
                                                        : `/profilePictures/${previewImage}`
                                                }
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
                                    {errors.profile_picture && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.profile_picture}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.name
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Gender{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleSelectChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white ${
                                            errors.gender
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="e.g., Mathematics"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.department
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.department && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.department}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80"></div>

                        {/* Professional Information */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-briefcase text-blue-500 text-xs"></i>
                                Professional Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="e.g., 5"
                                        min="0"
                                        max="50"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.experience
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.experience && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.experience}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80"></div>

                        {/* Address & Bio */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-info-circle text-blue-500 text-xs"></i>
                                Additional Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Enter address"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition resize-none ${
                                            errors.address
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    ></textarea>
                                    {errors.address && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Bio / About
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Write a short bio about the teacher..."
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition resize-none ${
                                            errors.bio
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    ></textarea>
                                    {errors.bio && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.bio}
                                        </p>
                                    )}
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
                                        <i className="fas fa-plus"></i>
                                        {mode === "edit"
                                            ? "Update Teacher"
                                            : "Add Teacher"}
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

export default AddTeacherModal;
