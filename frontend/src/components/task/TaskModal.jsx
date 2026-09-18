import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
    addTask,
    updateTask,
} from "../../services/taskService";
import toast from "react-hot-toast";
function TaskModal({
    open,
    onClose,
    onTaskAdded,
    selectedTask,
}) {
    const emptyForm = {
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "PENDING",
        dueDate: "",
    };

const [formData, setFormData] = useState(emptyForm);
useEffect(() => {

    if (selectedTask) {

        setFormData({
            title: selectedTask.title,
            description: selectedTask.description,
            priority: selectedTask.priority,
            status: selectedTask.status,
            dueDate: selectedTask.dueDate,
        });

    } else {

        setFormData(emptyForm);

    }

}, [selectedTask]);

    if (!open) return null;

    const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (selectedTask) {

            await updateTask(
                selectedTask.id,
                formData
            );

            toast.success("Task updated successfully.");

        } else {

            await addTask(formData);

            toast.success("Task added successfully.");

        }

        setFormData(emptyForm);

        if (onTaskAdded) {
            await onTaskAdded();
        }

        onClose();

    } catch (err) {

        console.error(err);

        toast.error("Unable to save task.");

    }

};

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

                <div className="flex justify-between items-center border-b p-6">

                    <h2 className="text-2xl font-bold">
                        {selectedTask ? "Edit Task" : "Create New Task"}
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Title
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 border rounded-xl p-3"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl p-3"
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="font-medium">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-xl p-3"
                            >
                                <option>LOW</option>
                                <option>MEDIUM</option>
                                <option>HIGH</option>
                            </select>

                        </div>

                        <div>

                            <label className="font-medium">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-xl p-3"
                            >
                                <option>PENDING</option>
                                <option>COMPLETED</option>
                            </select>

                        </div>

                    </div>

                    <div>

                        <label className="font-medium">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl p-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {selectedTask ? "Update Task" : "Create Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default TaskModal;