import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] py-12 px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1e293b] text-white text-xl font-bold mb-3">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h1 className="text-xl font-semibold text-[#0f172a] tracking-tight">
                        Academy<span className="text-[#3b82f6]">Hub</span>
                    </h1>
                    <p className="text-sm text-[#94a3b8] mt-1">
                        Create your account
                    </p>
                </div>

                {/* Card */}
                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#eef2f6] p-8">
                    <form onSubmit={submit}>
                        {/* Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-xs font-medium text-[#475569] mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition placeholder:text-[#94a3b8]"
                                placeholder="John Doe"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-[#475569] mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition placeholder:text-[#94a3b8]"
                                placeholder="you@example.com"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-xs font-medium text-[#475569] mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition placeholder:text-[#94a3b8]"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-xs font-medium text-[#475569] mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition placeholder:text-[#94a3b8]"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-medium py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#64748b] mt-6">
                        Already have an account?
                        <Link
                            href={route("login")}
                            className="text-[#1e293b] font-medium hover:text-[#3b82f6] transition ml-1"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-[#94a3b8] mt-6">
                    © 2026 AcademyHub
                </p>
            </div>
        </>
    );
}
