import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    ListTodo,
    Plus,
    CalendarDays,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../services/taskService";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadTasks = async () => {

            try {

                const data = await getTasks();

                setTasks(data || []);

            } catch (error) {

                console.error("Failed to load tasks:", error);

            } finally {

                setLoading(false);

            }

        };

        loadTasks();

    }, []);

    const completedTasks = tasks.filter(
        (task) =>
            task.completed === true ||
            task.status === "COMPLETED"
    );

    const pendingTasks = tasks.filter(
        (task) =>
            task.completed !== true &&
            task.status !== "COMPLETED"
    );

    const today = new Date();

    const todayTasks = tasks.filter((task) => {

        if (!task.dueDate) {
            return false;
        }

        const taskDate = new Date(task.dueDate);

        return (
            taskDate.getDate() === today.getDate() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
        );

    });

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto">

                {/* Welcome Section */}

                <div className="mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <h1 className="text-3xl font-bold text-slate-800">
                                Good to see you, {user?.name || "User"} 👋
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Here's what's happening with your tasks today.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/add-task")}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                bg-slate-900
                                hover:bg-slate-800
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                transition
                                shadow-sm
                            "
                        >

                            <Plus size={19} />

                            Add Task

                        </button>

                    </div>

                </div>

                {/* Statistics */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                    mb-8
                ">

                    {/* Total Tasks */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Total Tasks
                                </p>

                                <p className="text-3xl font-bold text-slate-800 mt-2">
                                    {tasks.length}
                                </p>

                            </div>

                            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">

                                <ListTodo size={24} />

                            </div>

                        </div>

                    </div>

                    {/* Today's Tasks */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Today's Tasks
                                </p>

                                <p className="text-3xl font-bold text-slate-800 mt-2">
                                    {todayTasks.length}
                                </p>

                            </div>

                            <div className="p-3 rounded-xl bg-purple-100 text-purple-600">

                                <CalendarDays size={24} />

                            </div>

                        </div>

                    </div>

                    {/* Pending */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Pending
                                </p>

                                <p className="text-3xl font-bold text-slate-800 mt-2">
                                    {pendingTasks.length}
                                </p>

                            </div>

                            <div className="p-3 rounded-xl bg-orange-100 text-orange-600">

                                <Clock3 size={24} />

                            </div>

                        </div>

                    </div>

                    {/* Completed */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Completed
                                </p>

                                <p className="text-3xl font-bold text-slate-800 mt-2">
                                    {completedTasks.length}
                                </p>

                            </div>

                            <div className="p-3 rounded-xl bg-green-100 text-green-600">

                                <CheckCircle2 size={24} />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Recent Tasks */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    overflow-hidden
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-slate-200
                        flex
                        items-center
                        justify-between
                    ">

                        <div>

                            <h2 className="text-xl font-bold text-slate-800">
                                Recent Tasks
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Your latest tasks and their progress.
                            </p>

                        </div>

                    </div>

                    {loading ? (

                        <div className="p-10 text-center text-slate-500">
                            Loading tasks...
                        </div>

                    ) : tasks.length === 0 ? (

                        <div className="p-10 text-center">

                            <ListTodo
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <p className="mt-3 text-slate-500">
                                No tasks available yet.
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Create your first task to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-slate-100">

                            {tasks.slice(0, 5).map((task) => {

                                const completed =
                                    task.completed === true ||
                                    task.status === "COMPLETED";

                                return (

                                    <div
                                        key={task.id}
                                        className="
                                            px-6
                                            py-4
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                            hover:bg-slate-50
                                            transition
                                        "
                                    >

                                        <div className="min-w-0">

                                            <p className={`
                                                font-semibold
                                                truncate
                                                ${completed
                                                    ? "text-slate-400 line-through"
                                                    : "text-slate-800"
                                                }
                                            `}>
                                                {task.title}
                                            </p>

                                            {task.description && (

                                                <p className="text-sm text-slate-500 mt-1 truncate">
                                                    {task.description}
                                                </p>

                                            )}

                                        </div>

                                        <div className="shrink-0">

                                            {completed ? (

                                                <span className="
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-green-100
                                                    text-green-700
                                                ">
                                                    Completed
                                                </span>

                                            ) : (

                                                <span className="
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-orange-100
                                                    text-orange-700
                                                ">
                                                    Pending
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;