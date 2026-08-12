import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    studentName,
    studentId,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const confirmDelete = () => {
        router.delete(`/students/${studentId}`, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

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
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transition-all duration-300 ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4"
                    }`}
                >
                    {/* Content */}
                    <div className="p-6">
                        {/* Icon */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <i className="fas fa-trash-alt text-2xl text-red-600"></i>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                            Delete Student
                        </h3>

                        {/* Message */}
                        <p className="text-sm text-slate-500 text-center mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-slate-800">
                                {studentName || "this student"}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-600/20 transition flex items-center gap-2"
                            >
                                <i className="fas fa-trash-alt"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
