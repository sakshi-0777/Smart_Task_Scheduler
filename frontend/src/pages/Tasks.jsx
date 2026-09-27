import { useEffect, useState } from "react";
import {
    CheckCircle,
    Clock,
    Trash2,
    Pencil,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
    getTasks,
    updateTask,
    deleteTask,
} from "../services/taskService";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const [saving, setSaving] = useState(false);


    /* --------------------------------
       LOAD TASKS
    -------------------------------- */

    const loadTasks = async () => {

        try {

            setLoading(true);

            const data = await getTasks();

            setTasks(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load tasks:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadTasks();

    }, []);


    /* --------------------------------
       OPEN EDIT MODAL
    -------------------------------- */

    const handleEdit = (task) => {

        setEditingTask(task);

        setEditForm({
            title: task.title || "",
            description: task.description || "",
            dueDate: task.dueDate || "",
        });

    };


    /* --------------------------------
       HANDLE EDIT INPUT
    -------------------------------- */

    const handleEditChange = (e) => {

        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });

    };


    /* --------------------------------
       UPDATE TASK
    -------------------------------- */

    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!editForm.title.trim()) {

            toast.error(
                "Task title is required"
            );

            return;
        }

        try {

            setSaving(true);

            const updatedTask = await updateTask(
                editingTask.id,
                editForm
            );

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.id === editingTask.id
                        ? {
                            ...task,
                            ...updatedTask,
                            ...editForm,
                        }
                        : task
                )
            );

            toast.success(
                "Task updated successfully!"
            );

            setEditingTask(null);

        } catch (error) {

            console.error(
                "Update task error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update task"
            );

        } finally {

            setSaving(false);

        }
    };


    /* --------------------------------
       DELETE TASK
    -------------------------------- */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {

            await deleteTask(id);

            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) => task.id !== id
                )
            );

            toast.success(
                "Task deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Delete task error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to delete task"
            );

        }
    };


    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto">

                {/* --------------------------------
                   PAGE HEADER
                -------------------------------- */}

                <div className="mb-8">

                    <h1 className="
                        text-3xl
                        font-bold
                        text-slate-800
                    ">
                        My Tasks
                    </h1>

                    <p className="
                        text-slate-500
                        mt-1
                    ">
                        View and manage all your tasks.
                    </p>

                </div>


                {/* --------------------------------
                   LOADING
                -------------------------------- */}

                {loading && (

                    <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-10
                        text-center
                    ">

                        <p className="text-slate-500">
                            Loading tasks...
                        </p>

                    </div>

                )}


                {/* --------------------------------
                   EMPTY
                -------------------------------- */}

                {!loading && tasks.length === 0 && (

                    <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-12
                        text-center
                    ">

                        <CheckCircle
                            size={48}
                            className="
                                mx-auto
                                text-slate-300
                                mb-4
                            "
                        />

                        <h2 className="
                            text-xl
                            font-semibold
                            text-slate-700
                        ">
                            No tasks yet
                        </h2>

                        <p className="
                            text-slate-500
                            mt-2
                        ">
                            Add your first task to get started.
                        </p>

                    </div>

                )}


                {/* --------------------------------
                   TASK LIST
                -------------------------------- */}

                {!loading && tasks.length > 0 && (

                    <div className="space-y-4">

                        {tasks.map((task) => (

                            <div
                                key={task.id}
                                className="
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    p-6
                                    flex
                                    items-center
                                    justify-between
                                    gap-6
                                    shadow-sm
                                    hover:shadow-md
                                    transition
                                "
                            >

                                {/* Task Information */}

                                <div className="flex-1 min-w-0">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <h2 className="
                                            text-lg
                                            font-semibold
                                            text-slate-800
                                            truncate
                                        ">
                                            {task.title}
                                        </h2>

                                        {task.completed && (

                                            <span className="
                                                flex
                                                items-center
                                                gap-1
                                                text-xs
                                                font-medium
                                                text-green-600
                                                bg-green-50
                                                px-2.5
                                                py-1
                                                rounded-full
                                                shrink-0
                                            ">

                                                <CheckCircle size={13} />

                                                Completed

                                            </span>

                                        )}

                                    </div>


                                    {task.description && (

                                        <p className="
                                            text-slate-500
                                            mt-2
                                            line-clamp-2
                                        ">
                                            {task.description}
                                        </p>

                                    )}


                                    {task.dueDate && (

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            mt-3
                                            text-sm
                                            text-slate-400
                                        ">

                                            <Clock size={16} />

                                            Due: {task.dueDate}

                                        </div>

                                    )}

                                </div>


                                {/* ACTIONS */}

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    shrink-0
                                ">

                                    {/* EDIT */}

                                    <button
                                        onClick={() =>
                                            handleEdit(task)
                                        }
                                        className="
                                            p-3
                                            rounded-xl
                                            text-slate-500
                                            hover:bg-blue-50
                                            hover:text-blue-600
                                            transition
                                        "
                                        title="Edit task"
                                    >

                                        <Pencil size={18} />

                                    </button>


                                    {/* DELETE */}

                                    <button
                                        onClick={() =>
                                            handleDelete(task.id)
                                        }
                                        className="
                                            p-3
                                            rounded-xl
                                            text-slate-500
                                            hover:bg-red-50
                                            hover:text-red-600
                                            transition
                                        "
                                        title="Delete task"
                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ====================================
                EDIT TASK MODAL
            ==================================== */}

            {editingTask && (

                <div className="
                    fixed
                    inset-0
                    bg-slate-900/40
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    p-4
                    z-50
                ">

                    <div className="
                        w-full
                        max-w-lg
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
                                    text-xl
                                    font-bold
                                    text-slate-800
                                ">
                                    Edit Task
                                </h2>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">
                                    Update your task details.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setEditingTask(null)
                                }
                                className="
                                    p-2
                                    rounded-xl
                                    hover:bg-slate-100
                                    transition
                                "
                            >

                                <X
                                    size={20}
                                    className="text-slate-500"
                                />

                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleUpdate}
                            className="p-6 space-y-5"
                        >

                            {/* Title */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Task Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                    "
                                    placeholder="Enter task title"
                                />

                            </div>


                            {/* Description */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditChange}
                                    rows="4"
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        outline-none
                                        resize-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                    "
                                    placeholder="Enter task description"
                                />

                            </div>


                            {/* Due Date */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    value={editForm.dueDate}
                                    onChange={handleEditChange}
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                    "
                                />

                            </div>


                            {/* Buttons */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                pt-2
                            ">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingTask(null)
                                    }
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        text-slate-600
                                        font-medium
                                        hover:bg-slate-50
                                        transition
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-slate-900
                                        text-white
                                        font-semibold
                                        hover:bg-slate-800
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"
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

export default Tasks;