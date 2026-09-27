import {
    LayoutDashboard,
    ListTodo,
    PlusCircle,
    Settings,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Tasks",
            icon: ListTodo,
            path: "/tasks",
        },
        {
            name: "Add Task",
            icon: PlusCircle,
            path: "/add-task",
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];

    return (
        <aside className="
            hidden
            md:flex
            flex-col
            w-72
            h-screen
            shrink-0
            bg-slate-900
            text-white
        ">

            {/* Logo */}

            <div className="p-8">

                <h1 className="text-2xl font-bold">
                    Smart Task
                </h1>

                <p className="text-slate-400">
                    Scheduler
                </p>

            </div>

            {/* Navigation */}

            <nav className="mt-8 flex-1">

                {menus.map((item) => {

                    const Icon = item.icon;

                    const isActive =
                        location.pathname === item.path;

                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`
                                w-full
                                flex
                                items-center
                                gap-4
                                px-8
                                py-4
                                transition
                                text-left
                                ${
                                    isActive
                                        ? "bg-slate-800 text-white"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }
                            `}
                        >

                            <Icon size={22} />

                            <span>
                                {item.name}
                            </span>

                        </button>
                    );
                })}

            </nav>

        </aside>
    );
}

export default Sidebar;