import {
    Calendar,
    Pencil,
    Trash2
} from "lucide-react";

function TaskCard({
    task,
    onEdit,
    onDelete
}) {

    const priorityColor = {
        LOW: "bg-green-100 text-green-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        HIGH: "bg-red-100 text-red-700",
    };

    const statusColor = {
        PENDING: "bg-orange-100 text-orange-700",
        COMPLETED: "bg-blue-100 text-blue-700",
    };

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-semibold text-slate-800">

                        {task.title}

                    </h2>

                    <p className="text-slate-500 mt-2">

                        {task.description}

                    </p>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(task)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor[task.priority]}`}
                >
                    {task.priority}
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[task.status]}`}
                >
                    {task.status}
                </span>

                <div className="flex items-center gap-2 text-slate-500">

                    <Calendar size={16} />

                    {task.dueDate}

                </div>

            </div>

        </div>

    );

}

export default TaskCard;