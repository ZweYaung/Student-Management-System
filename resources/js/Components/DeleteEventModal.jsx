import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const DeleteEventModal = ({
    isOpen,
    onClose,
    onSuccess,
    eventId,
    eventTitle,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleConfirm = () => {
        setLoading(true);
        router.delete(`/schedule/${eventId}`, {
            onSuccess: () => {
                setLoading(false);
                onClose();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                setLoading(false);
            },
        });
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
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transition-all duration-300 ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4"
                    }`}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <i className="fas fa-trash-alt text-2xl text-red-600"></i>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                            Delete Event
                        </h3>

                        <p className="text-sm text-slate-500 text-center mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-slate-800">
                                "{eventTitle || "this event"}"
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={loading}
                                className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-600/20 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-trash-alt"></i>
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteEventModal;
