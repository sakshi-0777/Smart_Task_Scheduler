import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import { addTask } from "../services/taskService";

function AddTask() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Task title is required");
            return;
        }

        try {

            setLoading(true);

            await addTask(formData);

            toast.success("Task added successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.error("Add task error:", error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add task"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <DashboardLayout>

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="flex items-center gap-4 mb-8">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="
                            p-3
                            rounded-xl
                            bg-white
                            border
                            border-slate-200
                            hover:bg-slate-50
                            transition
                        "
                    >
                        <ArrowLeft
                            size={20}
                            className="text-slate-600"
                        />
                    </button>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Add Task
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Create a new task and keep your work organized.
                        </p>

                    </div>

                </div>

                {/* Form */}

                <div className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                ">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
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
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
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
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your task"
                                rows="5"
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
                                value={formData.dueDate}
                                onChange={handleChange}
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

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-6
                                py-3.5
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

                            <PlusCircle size={20} />

                            {loading
                                ? "Adding Task..."
                                : "Add Task"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default AddTask;