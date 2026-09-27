import { useState } from "react";
import {
    Lock,
    ChevronRight,
    Eye,
    EyeOff,
    X,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import logo from "../assets/logo.png";

import api from "../api/axios";

function Settings() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const openPasswordModal = () => {

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setError("");
        setSuccess("");

        setShowPasswordModal(true);
    };

    const closePasswordModal = () => {

        if (loading) return;

        setShowPasswordModal(false);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setError("");
        setSuccess("");
    };

    const handleChangePassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        // Validate new password

        if (newPassword.length < 6) {

            setError(
                "New password must be at least 6 characters long."
            );

            return;
        }

        // Confirm password

        if (newPassword !== confirmPassword) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }

        // Prevent same password

        if (currentPassword === newPassword) {

            setError(
                "New password cannot be the same as the current password."
            );

            return;
        }

        try {

            setLoading(true);

            await api.put("/users/change-password", {
                currentPassword,
                newPassword,
            });

            setSuccess(
                "Password changed successfully!"
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // Close modal after success

            setTimeout(() => {

                setShowPasswordModal(false);
                setSuccess("");

            }, 1500);

        } catch (err) {

            console.error("Change password error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to change password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <img
                            src={logo}
                            alt="Logo"
                            className="w-10 h-10 object-contain"
                        />

                        <div>

                            <h1 className="
                                text-4xl
                                font-bold
                                text-slate-800
                                ml-1
                            ">
                                Settings
                            </h1>

                            <p className="text-slate-500 mt-1 ml-1">
                                Manage your account and security settings.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Settings Card */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    border
                    border-slate-200
                    overflow-hidden
                ">

                    {/* Security */}

                    <div className="p-8">

                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">
                            Security
                        </h2>

                        <p className="
                            text-slate-500
                            mt-2
                            mb-6
                        ">
                            Manage your password and keep your account secure.
                        </p>


                        {/* Change Password */}

                        <button
                            onClick={openPasswordModal}
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                p-5
                                rounded-2xl
                                border
                                border-slate-200
                                hover:bg-slate-50
                                hover:border-blue-200
                                transition
                                text-left
                            "
                        >

                            <div className="flex items-center gap-4">

                                <div className="
                                    p-3
                                    rounded-xl
                                    bg-blue-100
                                    text-blue-600
                                ">

                                    <Lock size={22} />

                                </div>

                                <div>

                                    <h3 className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        Change Password
                                    </h3>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Update your account password
                                    </p>

                                </div>

                            </div>

                            <ChevronRight
                                size={20}
                                className="text-slate-400"
                            />

                        </button>

                    </div>

                </div>

            </div>


            {/* Change Password Modal */}

            {showPasswordModal && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    bg-black/50
                    flex
                    items-center
                    justify-center
                    px-4
                ">

                    <div className="
                        bg-white
                        w-full
                        max-w-md
                        rounded-3xl
                        shadow-2xl
                        p-7
                    ">

                        {/* Modal Header */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-6
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                ">
                                    Change Password
                                </h2>

                                <p className="
                                    text-slate-500
                                    text-sm
                                    mt-1
                                ">
                                    Create a new password for your account.
                                </p>

                            </div>

                            <button
                                onClick={closePasswordModal}
                                disabled={loading}
                                className="
                                    p-2
                                    rounded-xl
                                    hover:bg-slate-100
                                    transition
                                    disabled:opacity-50
                                "
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="
                                flex
                                items-start
                                gap-3
                                p-4
                                mb-5
                                rounded-xl
                                bg-red-50
                                border
                                border-red-200
                                text-red-700
                                text-sm
                            ">

                                <AlertCircle
                                    size={20}
                                    className="shrink-0"
                                />

                                <p>
                                    {error}
                                </p>

                            </div>

                        )}


                        {/* Success */}

                        {success && (

                            <div className="
                                flex
                                items-center
                                gap-3
                                p-4
                                mb-5
                                rounded-xl
                                bg-green-50
                                border
                                border-green-200
                                text-green-700
                                text-sm
                            ">

                                <CheckCircle size={20} />

                                <p>
                                    {success}
                                </p>

                            </div>

                        )}


                        <form
                            onSubmit={handleChangePassword}
                            className="space-y-5"
                        >

                            {/* Current Password */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Current Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter current password"
                                        required
                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            border
                                            border-slate-300
                                            px-4
                                            pr-12
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-100
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-3
                                            text-slate-500
                                        "
                                    >

                                        {showCurrentPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                        }

                                    </button>

                                </div>

                            </div>


                            {/* New Password */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter new password"
                                        required
                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            border
                                            border-slate-300
                                            px-4
                                            pr-12
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-100
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(
                                                !showNewPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-3
                                            text-slate-500
                                        "
                                    >

                                        {showNewPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                        }

                                    </button>

                                </div>

                                <p className="
                                    text-xs
                                    text-slate-400
                                    mt-2
                                ">
                                    Password must contain at least 6 characters.
                                </p>

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Confirm New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm new password"
                                        required
                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            border
                                            border-slate-300
                                            px-4
                                            pr-12
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-100
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-3
                                            text-slate-500
                                        "
                                    >

                                        {showConfirmPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                        }

                                    </button>

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                pt-3
                            ">

                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    disabled={loading}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-slate-100
                                        hover:bg-slate-200
                                        text-slate-700
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        font-medium
                                        transition
                                        disabled:opacity-60
                                    "
                                >

                                    {loading
                                        ? "Changing..."
                                        : "Change Password"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </DashboardLayout>

    );
}

export default Settings;