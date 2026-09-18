import { Trash2, X } from "lucide-react";

function DeleteTaskModal({
    open,
    task,
    onClose,
    onConfirm,
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Delete Task
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >
                        <X />
                    </button>

                </div>

                <div className="mt-6 flex justify-center">

                    <div className="bg-red-100 p-4 rounded-full">

                        <Trash2
                            size={34}
                            className="text-red-600"
                        />

                    </div>

                </div>

                <p className="text-center text-slate-600 mt-6">

                    Are you sure you want to delete

                    <br />

                    <span className="font-bold text-slate-800">

                        "{task?.title}"

                    </span>

                    ?

                </p>

                <p className="text-center text-sm text-red-500 mt-2">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete Task
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteTaskModal;