import React, { useEffect, useState } from "react";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
                setPassword("");
                setError("");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleConfirm = () => {
        if (!password) {
            setError("Please enter your password to confirm.");
            return;
        }
        setLoading(true);
        onConfirm(password);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleConfirm();
        }
        if (e.key === "Escape") {
            onClose();
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
                                <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                            Delete Account
                        </h3>

                        {/* Message */}
                        <p className="text-sm text-slate-500 text-center mb-6">
                            Are you sure you want to delete your account? This
                            action{" "}
                            <span className="font-semibold text-red-600">
                                cannot be undone
                            </span>
                            . All your data will be permanently removed.
                        </p>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Enter your password to confirm
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="••••••••"
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400 transition bg-[#f8fafc] ${
                                    error
                                        ? "border-red-500"
                                        : "border-slate-200"
                                }`}
                                autoFocus
                            />
                            {error && (
                                <p className="mt-1 text-xs text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
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
                                        Delete Account
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

export default DeleteAccountModal;
