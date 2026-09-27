import { useState, useRef, useEffect } from "react";

import {
    Bell,
    UserCircle,
    MoreVertical,
    User,
    BarChart3,
    Settings,
    LogOut,
    Search,
    X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getTasks } from "../../services/taskService";

function Navbar() {

    const { logout, user } = useAuth();

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [tasks, setTasks] = useState([]);

    const menuRef = useRef(null);


    /* --------------------------------
       LOAD TASKS
    -------------------------------- */

    useEffect(() => {

        const loadTasks = async () => {

            try {

                const data = await getTasks();

                setTasks(Array.isArray(data) ? data : []);

            } catch (error) {

                console.error(
                    "Failed to load tasks for search:",
                    error
                );

            }

        };

        loadTasks();

    }, []);


    /* --------------------------------
       SEARCH TASKS
    -------------------------------- */

    const filteredTasks =
        searchQuery.trim() === ""
            ? []
            : tasks.filter((task) => {

                const query =
                    searchQuery.toLowerCase().trim();

                const title =
                    task.title?.toLowerCase() || "";

                const description =
                    task.description?.toLowerCase() || "";

                return (
                    title.includes(query) ||
                    description.includes(query)
                );

            }).slice(0, 6);


    /* --------------------------------
       CLOSE MENU OUTSIDE CLICK
    -------------------------------- */

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /* --------------------------------
       LOGOUT
    -------------------------------- */

    const handleLogout = () => {

        setMenuOpen(false);

        logout();

        navigate("/", {
            replace: true,
        });

    };


    /* --------------------------------
       MENU NAVIGATION
    -------------------------------- */

    const handleMenuNavigation = (path) => {

        setMenuOpen(false);

        navigate(path);

    };


    /* --------------------------------
       SEARCH RESULT
    -------------------------------- */

    const handleTaskClick = (task) => {

        setSearchQuery("");

        navigate("/tasks", {
            state: {
                selectedTaskId: task.id,
            },
        });

    };


    return (

        <header
            className="
                h-20
                bg-white
                border-b
                border-slate-200
                flex
                items-center
                justify-between
                px-6
                lg:px-8
                sticky
                top-0
                z-40
            "
        >

            {/* --------------------------------
                SEARCH BAR
            -------------------------------- */}

            <div className="relative w-full max-w-xl">

                <div
                    className="
                        flex
                        items-center
                        bg-slate-100
                        border
                        border-transparent
                        rounded-xl
                        px-4
                        h-11
                        transition
                        focus-within:bg-white
                        focus-within:border-slate-300
                        focus-within:ring-2
                        focus-within:ring-slate-100
                    "
                >

                    <Search
                        size={19}
                        className="text-slate-400 shrink-0"
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                        placeholder="Search tasks by title or description..."
                        className="
                            w-full
                            bg-transparent
                            outline-none
                            border-none
                            px-3
                            text-sm
                            text-slate-700
                            placeholder:text-slate-400
                        "
                    />

                    {searchQuery && (

                        <button
                            onClick={() => setSearchQuery("")}
                            className="
                                p-1
                                rounded-lg
                                hover:bg-slate-200
                                transition
                            "
                        >

                            <X
                                size={17}
                                className="text-slate-500"
                            />

                        </button>

                    )}

                </div>


                {/* --------------------------------
                    SEARCH RESULTS
                -------------------------------- */}

                {searchQuery.trim() !== "" && (

                    <div
                        className="
                            absolute
                            top-14
                            left-0
                            right-0
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            shadow-xl
                            shadow-slate-900/10
                            overflow-hidden
                            z-50
                        "
                    >

                        {filteredTasks.length > 0 ? (

                            <div className="py-2">

                                {filteredTasks.map((task) => (

                                    <button
                                        key={task.id}
                                        onClick={() =>
                                            handleTaskClick(task)
                                        }
                                        className="
                                            w-full
                                            text-left
                                            px-5
                                            py-3
                                            hover:bg-slate-50
                                            transition
                                            border-b
                                            last:border-b-0
                                            border-slate-100
                                        "
                                    >

                                        <div className="flex items-start gap-3">

                                            <div
                                                className="
                                                    mt-1
                                                    w-2
                                                    h-2
                                                    rounded-full
                                                    bg-blue-500
                                                    shrink-0
                                                "
                                            />

                                            <div className="min-w-0">

                                                <p
                                                    className="
                                                        font-semibold
                                                        text-sm
                                                        text-slate-800
                                                        truncate
                                                    "
                                                >
                                                    {task.title}
                                                </p>

                                                {task.description && (

                                                    <p
                                                        className="
                                                            text-xs
                                                            text-slate-500
                                                            mt-1
                                                            line-clamp-2
                                                        "
                                                    >
                                                        {task.description}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    </button>

                                ))}

                                {tasks.filter((task) => {

                                    const query =
                                        searchQuery
                                            .toLowerCase()
                                            .trim();

                                    return (
                                        (task.title?.toLowerCase() || "")
                                            .includes(query) ||
                                        (task.description?.toLowerCase() || "")
                                            .includes(query)
                                    );

                                }).length > 6 && (

                                    <div
                                        className="
                                            px-5
                                            py-3
                                            text-center
                                            text-xs
                                            text-slate-400
                                            border-t
                                            border-slate-100
                                        "
                                    >
                                        Showing first 6 matching tasks
                                    </div>

                                )}

                            </div>

                        ) : (

                            <div className="px-5 py-8 text-center">

                                <Search
                                    size={28}
                                    className="
                                        mx-auto
                                        text-slate-300
                                        mb-2
                                    "
                                />

                                <p className="
                                    text-sm
                                    font-medium
                                    text-slate-600
                                ">
                                    No tasks found
                                </p>

                                <p className="
                                    text-xs
                                    text-slate-400
                                    mt-1
                                ">
                                    Try searching by title or description.
                                </p>

                            </div>

                        )}

                    </div>

                )}

            </div>


            {/* --------------------------------
                RIGHT SECTION
            -------------------------------- */}

            <div className="flex items-center gap-3 ml-6 shrink-0">


                {/* Notification */}

                <button
                    className="
                        relative
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-slate-100
                        transition
                    "
                >

                    <Bell
                        size={21}
                        className="text-slate-600"
                    />

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            rounded-full
                            bg-red-500
                            border-2
                            border-white
                        "
                    />

                </button>


                {/* Divider */}

                <div className="hidden sm:block h-8 w-px bg-slate-200" />


                {/* User */}

                <button
                    onClick={() => navigate("/profile")}
                    className="
                        hidden
                        sm:flex
                        items-center
                        gap-3
                        px-2
                        py-1.5
                        rounded-xl
                        hover:bg-slate-50
                        transition
                        text-left
                    "
                >

                    <UserCircle
                        size={40}
                        className="text-blue-600"
                    />

                    <div className="max-w-40">

                        <p
                            className="
                                font-semibold
                                text-sm
                                text-slate-800
                                truncate
                            "
                        >
                            {user?.name || "User"}
                        </p>

                        <p
                            className="
                                text-xs
                                text-slate-500
                                truncate
                            "
                        >
                            {user?.email || "No email"}
                        </p>

                    </div>

                </button>


                {/* Three dots */}

                <div
                    className="relative"
                    ref={menuRef}
                >

                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            hover:bg-slate-100
                            transition
                        "
                    >

                        <MoreVertical
                            size={21}
                            className="text-slate-600"
                        />

                    </button>


                    {/* MENU */}

                    {menuOpen && (

                        <div
                            className="
                                absolute
                                right-0
                                top-12
                                w-60
                                bg-white
                                rounded-2xl
                                border
                                border-slate-200
                                shadow-xl
                                shadow-slate-900/10
                                overflow-hidden
                                z-50
                            "
                        >

                            {/* User header */}

                            <div
                                className="
                                    px-5
                                    py-4
                                    bg-slate-50
                                    border-b
                                    border-slate-200
                                "
                            >

                                <p className="font-semibold text-slate-800">
                                    {user?.name || "User"}
                                </p>

                                <p className="text-xs text-slate-500 mt-1 truncate">
                                    {user?.email || ""}
                                </p>

                            </div>


                            {/* Profile */}

                            <button
                                onClick={() =>
                                    handleMenuNavigation("/profile")
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-5
                                    py-3
                                    text-sm
                                    text-slate-700
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                <User size={18} />

                                <span>
                                    My Profile
                                </span>

                            </button>


                            {/* Analytics */}

                            <button
                                onClick={() =>
                                    handleMenuNavigation("/analytics")
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-5
                                    py-3
                                    text-sm
                                    text-slate-700
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                <BarChart3 size={18} />

                                <span>
                                    Analytics
                                </span>

                            </button>


                            {/* Settings */}

                            <button
                                onClick={() =>
                                    handleMenuNavigation("/settings")
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-5
                                    py-3
                                    text-sm
                                    text-slate-700
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                <Settings size={18} />

                                <span>
                                    Settings
                                </span>

                            </button>


                            <div className="border-t border-slate-200" />


                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-5
                                    py-3
                                    text-sm
                                    text-red-600
                                    hover:bg-red-50
                                    transition
                                "
                            >

                                <LogOut size={18} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );
}

export default Navbar;