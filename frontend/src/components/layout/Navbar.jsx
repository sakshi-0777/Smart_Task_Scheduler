import { useState, useRef, useEffect } from "react";
import {
    Bell,
    MoreVertical,
    User,
    BarChart3,
    Settings,
    LogOut,
    KeyRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { logout, user } = useAuth();

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleLogout = () => {

        logout();

        navigate("/", { replace: true });

    };

    const currentHour = new Date().getHours();

    let greeting = "Good Evening";

    if (currentHour < 12) greeting = "Good Morning";
    else if (currentHour < 17) greeting = "Good Afternoon";

    const username = user?.name || "User";

    const avatarLetter = username.charAt(0).toUpperCase();

    return (

        <header className="bg-white border-b border-slate-200 h-24 px-8 flex items-center justify-between">

            {/* Left */}

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    {greeting}, {username}
                </h1>

                <p className="text-slate-500 mt-1">
                    Let's make today productive.
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                {/* Notification */}

                <button className="relative">

                    <Bell
                        size={22}
                        className="text-slate-600 hover:text-blue-600 transition"
                    />

                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

                </button>

                {/* Avatar */}

                <div className="flex items-center gap-3">

                    <div
                        className="
                            h-11
                            w-11
                            rounded-full
                            bg-slate-700
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            shadow-md
                        "
                    >
                        {avatarLetter}
                    </div>

                    <div>

                        <p className="font-semibold">
                            {username}
                        </p>

                        <p className="text-sm text-slate-500">
                            Task Scheduler
                        </p>

                    </div>

                </div>

                {/* Menu */}

                <div
                    className="relative"
                    ref={menuRef}
                >

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-xl hover:bg-slate-100 transition"
                    >
                        <MoreVertical size={22} />
                    </button>

                    {menuOpen && (

                        <div
                            className="
                                absolute
                                right-0
                                mt-3
                                w-60
                                bg-white
                                rounded-2xl
                                border
                                shadow-xl
                                overflow-hidden
                                z-50
                            "
                        >

                            <div className="px-5 py-4 border-b">

                                <p className="font-semibold">
                                    {username}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {user?.email}
                                </p>

                            </div>

                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/profile");
                                }}
                                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-slate-100 transition"
                            >
                                <User size={18} />

                                My Profile

                            </button>

                            <button
                                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-slate-100 transition"
                            >
                                <BarChart3 size={18} />

                                Analytics
                            </button>

                            <button
                                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-slate-100 transition"
                            >
                                <Settings size={18} />

                                Settings
                            </button>

                            <div className="border-t"></div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 transition"
                            >
                                <LogOut size={18} />

                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}

export default Navbar;