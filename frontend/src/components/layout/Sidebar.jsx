import {
    LayoutDashboard,
    ListTodo,
    PlusCircle,
    Settings,
} from "lucide-react";

function Sidebar() {
    const menus = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Tasks",
            icon: ListTodo,
        },
        {
            name: "Add Task",
            icon: PlusCircle,
        },
        {
            name: "Settings",
            icon: Settings,
        },
    ];

    return (
        <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white">

            <div className="p-8">

                <h1 className="text-2xl font-bold">
                    Smart Task
                </h1>

                <p className="text-slate-400">
                    Scheduler
                </p>

            </div>

            <nav className="mt-8 flex-1">

                {menus.map((item) => {

                    const Icon = item.icon;

                    return (
                        <button
                            key={item.name}
                            className="
                                w-full
                                flex
                                items-center
                                gap-4
                                px-8
                                py-4
                                hover:bg-slate-800
                                transition
                            "
                        >
                            <Icon size={22} />

                            {item.name}

                        </button>
                    );
                })}

            </nav>

        </aside>
    );
}

export default Sidebar;