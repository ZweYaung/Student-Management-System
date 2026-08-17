import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const AddCourseModal = ({
    isOpen,
    onClose,
    onSuccess,
    mode = "add",
    courseData = null,
    teachers = [],
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        credits: "",
        department: "",
        teacher_ids: [],
        status: "active",
        max_students: "",
        current_students: "",
    });

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });

            if (mode === "edit" && courseData) {
                setFormData({
                    name: courseData.name || "",
                    code: courseData.code || "",
                    description: courseData.description || "",
                    credits: courseData.credits || "",
                    department: courseData.department || "",
                    teacher_ids: courseData.teachers
                        ? courseData.teachers.map((t) => t.id)
                        : [],
                    status: courseData.status || "active",
                    max_students: courseData.max_students || "",
                    current_students: courseData.current_students || "",
                });
            } else {
                setFormData({
                    name: "",
                    code: "",
                    description: "",
                    credits: "",
                    department: "",
                    teacher_ids: [],
                    status: "active",
                    max_students: "",
                    current_students: "",
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
    }, [isOpen, mode, courseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleMultiSelectChange = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(parseInt(options[i].value));
            }
        }
        setFormData({ ...formData, teacher_ids: selectedValues });
        if (errors.teacher_ids) {
            setErrors({ ...errors, teacher_ids: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = { ...formData };

        if (mode === "edit" && courseData) {
            router.put(`/courses/${courseData.id}`, data, {
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
            router.post("/courses", data, {
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
                                <i className="fas fa-book-open"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    {mode === "edit"
                                        ? "Edit Course"
                                        : "Add New Course"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {mode === "edit"
                                        ? "Update the course information below"
                                        : "Fill in the details to add a new course"}
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
                        {/* Course Information */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-info-circle text-blue-500 text-xs"></i>
                                Course Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Course Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter course name"
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
                                        Course Code{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        placeholder="e.g., MATH101"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.code
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.code && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.code}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Credits
                                    </label>
                                    <input
                                        type="number"
                                        name="credits"
                                        value={formData.credits}
                                        onChange={handleChange}
                                        placeholder="e.g., 3"
                                        min="1"
                                        max="6"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.credits
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.credits && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.credits}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80"></div>

                        {/* Course Details */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-cog text-blue-500 text-xs"></i>
                                Course Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Department
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white ${
                                            errors.department
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    >
                                        <option value="">
                                            Select department
                                        </option>
                                        <option value="Mathematics">
                                            Mathematics
                                        </option>
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
                                        <option value="Biology">Biology</option>
                                        <option value="Chemistry">
                                            Chemistry
                                        </option>
                                        <option value="Physics">Physics</option>
                                    </select>
                                    {errors.department && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.department}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Teachers{" "}
                                        <span className="text-xs text-slate-400">
                                            (select multiple)
                                        </span>
                                    </label>
                                    <select
                                        multiple
                                        value={formData.teacher_ids}
                                        onChange={handleMultiSelectChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white ${
                                            errors.teacher_ids
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                        size="4"
                                    >
                                        {teachers.map((teacher) => (
                                            <option
                                                key={teacher.id}
                                                value={teacher.id}
                                            >
                                                {teacher.name} (
                                                {teacher.department ||
                                                    "No department"}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        Hold Ctrl (Windows) or Cmd (Mac) to
                                        select multiple teachers
                                    </p>
                                    {errors.teacher_ids && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.teacher_ids}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80"></div>

                        {/* Status & Enrollment */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-users text-blue-500 text-xs"></i>
                                Status & Enrollment
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Status{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-white ${
                                            errors.status
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    >
                                        <option value="active">Active</option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Max Students
                                    </label>
                                    <input
                                        type="number"
                                        name="max_students"
                                        value={formData.max_students}
                                        onChange={handleChange}
                                        placeholder="e.g., 30"
                                        min="1"
                                        max="100"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.max_students
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.max_students && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.max_students}
                                        </p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Current Students Enrolled
                                    </label>
                                    <input
                                        type="number"
                                        name="current_students"
                                        value={formData.current_students}
                                        onChange={handleChange}
                                        placeholder="e.g., 0"
                                        min="0"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition ${
                                            errors.current_students
                                                ? "border-red-500"
                                                : "border-slate-200"
                                        }`}
                                    />
                                    {errors.current_students && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.current_students}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80"></div>

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                                <i className="fas fa-align-left text-blue-500 text-xs"></i>
                                Description
                            </h3>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Course Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter course description..."
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition resize-none ${
                                        errors.description
                                            ? "border-red-500"
                                            : "border-slate-200"
                                    }`}
                                ></textarea>
                                {errors.description && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.description}
                                    </p>
                                )}
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
                                            ? "Update Course"
                                            : "Add Course"}
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

export default AddCourseModal;
