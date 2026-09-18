import { useState } from "react";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { changePassword } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function ChangePassword() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword.length < 6) {

            toast.error(
                "New password must be at least 6 characters."
            );

            return;
        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            toast.error("New passwords do not match.");

            return;
        }

        try {

            setLoading(true);

            await changePassword(
                formData.currentPassword,
                formData.newPassword
            );

            toast.success(
                "Password changed successfully."
            );

            // Old JWT should no longer be used
            logout();

            navigate("/", {
                replace: true,
            });

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data ||
                "Unable to change password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">

            <div className="w-full max-w-lg">

                <div className="bg-white rounded-3xl shadow-2xl p-8">

                    {/* Back */}

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition mb-6"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>

                    {/* Header */}

                    <div className="mb-8">

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">

                            <Lock
                                size={28}
                                className="text-blue-600"
                            />

                        </div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Change Password
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Update your account password to keep
                            your account secure.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Current Password */}

                        <PasswordInput
                            name="currentPassword"
                            placeholder="Current password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            show={showCurrent}
                            setShow={setShowCurrent}
                        />

                        {/* New Password */}

                        <PasswordInput
                            name="newPassword"
                            placeholder="New password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            show={showNew}
                            setShow={setShowNew}
                        />

                        {/* Confirm Password */}

                        <PasswordInput
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            show={showConfirm}
                            setShow={setShowConfirm}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                h-14
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-semibold
                                transition
                                disabled:opacity-60
                            "
                        >

                            {loading
                                ? "Updating..."
                                : "Change Password"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

function PasswordInput({
    name,
    placeholder,
    value,
    onChange,
    show,
    setShow,
}) {

    return (

        <div className="relative">

            <Lock
                size={20}
                className="absolute left-4 top-4 text-slate-400"
            />

            <input
                type={show ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                autoComplete={
                    name === "currentPassword"
                        ? "current-password"
                        : "new-password"
                }
                value={value}
                onChange={onChange}
                required
                className="
                    w-full
                    h-14
                    rounded-xl
                    border
                    border-slate-300
                    pl-12
                    pr-12
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                "
            />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-4 text-slate-500 hover:text-blue-600"
            >

                {show
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                }

            </button>

        </div>
    );
}

export default ChangePassword;