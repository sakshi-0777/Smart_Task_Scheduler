import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    onEdit,
    onDelete,
}) {

    return (

        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
                My Tasks
            </h2>

            <div className="grid gap-6">

                {tasks.length === 0 ? (

                    <div className="bg-white rounded-2xl border p-10 text-center text-slate-500">

                        No tasks found.

                    </div>

                ) : (

                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    ))

                )}

            </div>

        </div>

    );
}

export default TaskList;