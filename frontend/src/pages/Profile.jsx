import { useState } from "react";
import {
    UserCircle,
    Mail,
    Pencil,
    Lock,
    X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";

function Profile() {

    const { user } = useAuth();

    const [showEdit, setShowEdit] = useState(false);

    const [name, setName] = useState(
        user?.name || ""
    );

    const handleSave = () => {

        // We'll connect this to the backend next.
        console.log("New name:", name);

        setShowEdit(false);
    };

    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        My Profile
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage your account information.
                    </p>

                </div>

                {/* Profile Card */}

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Top Section */}

                    <div className="bg-slate-900 p-8">

                        <div className="flex items-center gap-5">

                            <div className="bg-white/20 rounded-full p-3">

                                <UserCircle
                                    size={80}
                                    className="text-white"
                                />

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold text-white">
                                    {user?.name || "User"}
                                </h2>

                                <p className="text-blue-100 mt-1">
                                    {user?.email || "No email available"}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Account Information */}

                    <div className="p-8">

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="text-xl font-bold text-slate-800">
                                Account Information
                            </h3>

                            <button
                                onClick={() => {
                                    setName(user?.name || "");
                                    setShowEdit(true);
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-slate-900
                                    hover:bg-slate-800
                                    text-white
                                    transition
                                "
                            >
                                <Pencil size={17} />
                                Edit Profile
                            </button>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Name */}

                            <div className="bg-slate-50 rounded-2xl p-5">

                                <div className="flex items-center gap-3">

                                    <UserCircle
                                        size={22}
                                        className="text-blue-600"
                                    />

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Full Name
                                        </p>

                                        <p className="font-semibold text-slate-800 mt-1">
                                            {user?.name || "Not available"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Email */}

                            <div className="bg-slate-50 rounded-2xl p-5">

                                <div className="flex items-center gap-3">

                                    <Mail
                                        size={22}
                                        className="text-blue-600"
                                    />

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Email Address
                                        </p>

                                        <p className="font-semibold text-slate-800 mt-1">
                                            {user?.email || "Not available"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Security */}

                        <div className="mt-8 border-t pt-8">

                            <h3 className="text-xl font-bold text-slate-800">
                                Security
                            </h3>

                            <p className="text-slate-500 mt-2 mb-5">
                                Keep your account secure by managing your password.
                            </p>

                            <button
                                onClick={() =>
                                    window.location.href =
                                        "/change-password"
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                <Lock size={18} />
                                Change Password
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Edit Profile Modal */}

            {showEdit && (

                <div className="
                    fixed
                    inset-0
                    bg-black/50
                    flex
                    items-center
                    justify-center
                    z-50
                    p-4
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

                        <div className="flex justify-between items-center mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    Edit Profile
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Update your account information.
                                </p>

                            </div>

                            <button
                                onClick={() => setShowEdit(false)}
                                className="
                                    p-2
                                    rounded-xl
                                    hover:bg-slate-100
                                    transition
                                "
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* Name */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="
                                    w-full
                                    h-12
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Email */}

                        <div className="mt-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="
                                    w-full
                                    h-12
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-100
                                    px-4
                                    text-slate-500
                                    cursor-not-allowed
                                "
                            />

                            <p className="text-xs text-slate-400 mt-2">
                                Email changes will be added separately.
                            </p>

                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end gap-3 mt-7">

                            <button
                                onClick={() => setShowEdit(false)}
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-slate-100
                                    hover:bg-slate-200
                                    text-slate-700
                                    transition
                                "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    font-medium
                                    transition
                                "
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </DashboardLayout>
    );
}

export default Profile;