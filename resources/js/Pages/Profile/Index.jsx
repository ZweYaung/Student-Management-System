import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import DeleteAccountModal from "@/Components/DeleteAccountModal";

export default function Profile({ user, stats }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Profile form
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
    });

    // Password form
    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        putPassword(route("profile.updatePassword"), {
            onSuccess: () => {
                setIsChangingPassword(false);
                resetPassword();
            },
        });
    };

    const handleCancelPassword = () => {
        resetPassword();
        setIsChangingPassword(false);
    };

    const handleDeleteAccount = (password) => {
        const deleteData = new FormData();
        deleteData.append("password", password);

        import("@inertiajs/react").then(({ router }) => {
            router.delete(route("profile.destroy"), {
                data: { password: password },
                onSuccess: () => {
                    window.location.href = "/";
                },
                onError: (errors) => {
                    console.error("Delete error:", errors);
                },
            });
        });
    };

    return (
        <DashboardLayout title="My Profile">
            <Head title="My Profile" />

            <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {user.name}
                            </h2>
                            <p className="text-sm text-slate-500">
                                Administrator
                            </p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <i className="fas fa-envelope text-blue-500"></i>{" "}
                                    {user.email}
                                </span>
                                {user.location && (
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <i className="fas fa-map-marker-alt text-blue-500"></i>{" "}
                                        {user.location}
                                    </span>
                                )}
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <i className="fas fa-calendar-alt text-blue-500"></i>{" "}
                                    Joined{" "}
                                    {new Date(
                                        user.created_at,
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                        >
                            <i className="fas fa-edit mr-1.5"></i>
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">
                            {stats.students}
                        </p>
                        <p className="text-xs text-slate-500">
                            Students Managed
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-600">
                            {stats.teachers}
                        </p>
                        <p className="text-xs text-slate-500">
                            Teachers Managed
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 text-center">
                        <p className="text-2xl font-bold text-amber-600">
                            {stats.courses}
                        </p>
                        <p className="text-xs text-slate-500">
                            Courses Created
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600">
                            {stats.attendance}%
                        </p>
                        <p className="text-xs text-slate-500">
                            Attendance Rate
                        </p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <i className="fas fa-info-circle text-blue-500"></i>
                        {isEditing
                            ? "Edit Profile Information"
                            : "Personal Information"}
                    </h3>

                    {!isEditing ? (
                        // View Mode
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Full Name
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    {user.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Email Address
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Phone Number
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    {user.phone || "Not provided"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Location
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    {user.location || "Not provided"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Role
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    Administrator
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">
                                    Joined On
                                </p>
                                <p className="text-sm text-slate-800 mt-1">
                                    {new Date(
                                        user.created_at,
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Edit Mode
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        placeholder="+1 234 567 890"
                                        className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                        placeholder="New York, USA"
                                        className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
                                    />
                                    {errors.location && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i>{" "}
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save"></i> Save
                                            Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <i className="fas fa-lock text-blue-500"></i>
                            Change Password
                        </h3>
                        {!isChangingPassword && (
                            <button
                                type="button"
                                onClick={() => setIsChangingPassword(true)}
                                className="text-sm text-blue-600 hover:text-blue-800 transition"
                            >
                                Change Password
                            </button>
                        )}
                    </div>

                    {isChangingPassword ? (
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-4 max-w-md"
                        >
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "current_password",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                                {passwordErrors.current_password && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {passwordErrors.current_password}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                                {passwordErrors.password && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {passwordErrors.password}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition bg-[#f8fafc]"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancelPassword}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {passwordProcessing ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i>{" "}
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save"></i>{" "}
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-sm text-slate-500">
                            Click "Change Password" to update your password.
                        </p>
                    )}
                </div>

                {/* Danger Zone - Delete Account */}
                <div className="bg-white rounded-xl shadow-sm border-2 border-red-200/60 p-6">
                    <h3 className="text-sm font-semibold text-red-600 mb-4 flex items-center gap-2">
                        <i className="fas fa-exclamation-triangle"></i>
                        Danger Zone
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Delete Account
                            </p>
                            <p className="text-xs text-slate-400">
                                This action cannot be undone. All your data will
                                be permanently removed.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 transition"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
        </DashboardLayout>
    );
}
