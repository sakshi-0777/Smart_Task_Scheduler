import { useState } from "react";
import {
    UserCircle,
    Mail,
    Pencil,
    X,
    Save,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";

function Profile() {

    const { user, updateUser } = useAuth();

    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [error, setError] = useState("");

    const handleOpenEdit = () => {

        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });

        setError("");
        setShowEdit(true);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSave = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.name.trim()) {
            setError("Name cannot be empty.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email cannot be empty.");
            return;
        }

        try {

            setLoading(true);

            // Backend API will be connected here
            await updateUser(formData);

            setShowEdit(false);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to update profile."
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

                    <h1 className="text-4xl font-bold text-slate-800">
                        My Profile
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage your account information.
                    </p>

                </div>


                {/* Profile Card */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    border
                    border-slate-200
                    overflow-hidden
                ">

                    {/* Profile Header */}

                    <div className="
                        bg-gradient-to-r
                        from-slate-900
                        via-blue-950
                        to-indigo-900
                        p-8
                    ">

                        <div className="flex items-center gap-5">

                            <div className="
                                bg-white/20
                                backdrop-blur-sm
                                rounded-full
                                p-3
                            ">

                                <UserCircle
                                    size={80}
                                    className="text-white"
                                />

                            </div>

                            <div>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-white
                                ">
                                    {user?.name || "User"}
                                </h2>

                                <p className="
                                    text-blue-100
                                    mt-1
                                ">
                                    {user?.email || "No email available"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Account Information */}

                    <div className="p-8">

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                            mb-6
                        ">

                            <div>

                                <h3 className="
                                    text-xl
                                    font-bold
                                    text-slate-800
                                ">
                                    Account Information
                                </h3>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">
                                    Your personal account details.
                                </p>

                            </div>


                            <button
                                onClick={handleOpenEdit}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-5
                                    py-2.5
                                    rounded-xl
                                    bg-slate-900
                                    hover:bg-slate-800
                                    text-white
                                    transition
                                    shadow-sm
                                "
                            >

                                <Pencil size={17} />

                                Edit Profile

                            </button>

                        </div>


                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">

                            {/* Name */}

                            <div className="
                                bg-slate-50
                                rounded-2xl
                                p-5
                                border
                                border-slate-100
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        p-2.5
                                        rounded-xl
                                        bg-blue-100
                                    ">

                                        <UserCircle
                                            size={22}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Full Name
                                        </p>

                                        <p className="
                                            font-semibold
                                            text-slate-800
                                            mt-1
                                        ">
                                            {user?.name || "Not available"}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Email */}

                            <div className="
                                bg-slate-50
                                rounded-2xl
                                p-5
                                border
                                border-slate-100
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        p-2.5
                                        rounded-xl
                                        bg-blue-100
                                    ">

                                        <Mail
                                            size={22}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Email Address
                                        </p>

                                        <p className="
                                            font-semibold
                                            text-slate-800
                                            mt-1
                                        ">
                                            {user?.email || "Not available"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Edit Profile Modal */}

                {showEdit && (

                    <div className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        backdrop-blur-sm
                        px-4
                    ">

                        <div className="
                            w-full
                            max-w-md
                            bg-white
                            rounded-3xl
                            shadow-2xl
                            overflow-hidden
                        ">

                            {/* Modal Header */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                px-6
                                py-5
                                border-b
                                border-slate-200
                            ">

                                <div>

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        Edit Profile
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Update your account information.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowEdit(false)}
                                    className="
                                        p-2
                                        rounded-xl
                                        hover:bg-slate-100
                                        text-slate-500
                                        transition
                                    "
                                >

                                    <X size={20} />

                                </button>

                            </div>


                            {/* Form */}

                            <form
                                onSubmit={handleSave}
                                className="p-6 space-y-5"
                            >

                                {/* Name */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    ">
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <UserCircle
                                            size={20}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="
                                                w-full
                                                h-12
                                                rounded-xl
                                                border
                                                border-slate-300
                                                pl-11
                                                pr-4
                                                outline-none
                                                focus:border-blue-500
                                                focus:ring-4
                                                focus:ring-blue-100
                                            "
                                            placeholder="Enter your name"
                                        />

                                    </div>

                                </div>


                                {/* Email */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    ">
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={20}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="
                                                w-full
                                                h-12
                                                rounded-xl
                                                border
                                                border-slate-300
                                                pl-11
                                                pr-4
                                                outline-none
                                                focus:border-blue-500
                                                focus:ring-4
                                                focus:ring-blue-100
                                            "
                                            placeholder="Enter your email"
                                        />

                                    </div>

                                </div>


                                {/* Error */}

                                {error && (

                                    <div className="
                                        bg-red-50
                                        border
                                        border-red-200
                                        text-red-600
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                    ">
                                        {error}
                                    </div>

                                )}


                                {/* Buttons */}

                                <div className="
                                    flex
                                    gap-3
                                    pt-2
                                ">

                                    <button
                                        type="button"
                                        onClick={() => setShowEdit(false)}
                                        className="
                                            flex-1
                                            h-12
                                            rounded-xl
                                            border
                                            border-slate-300
                                            text-slate-700
                                            font-semibold
                                            hover:bg-slate-50
                                            transition
                                        "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            flex-1
                                            h-12
                                            rounded-xl
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            font-semibold
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            transition
                                            disabled:opacity-60
                                        "
                                    >

                                        <Save size={18} />

                                        {loading
                                            ? "Saving..."
                                            : "Save Changes"
                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

export default Profile;