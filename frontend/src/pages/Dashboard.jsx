import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import TaskStats from "../components/task/TaskStats";
import TaskList from "../components/task/TaskList";
import TaskModal from "../components/task/TaskModal";

import { getTasks,
    deleteTask,
 } from "../services/taskService";

import DeleteTaskModal from "../components/task/DeleteTaskModal";
import toast from "react-hot-toast";

import TaskToolbar from "../components/task/ToolTaskbar";

function Dashboard() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("DATE");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async () => {

    try {

            await deleteTask(taskToDelete.id);

            toast.success("Task deleted successfully!");

            setDeleteModalOpen(false);
            setTaskToDelete(null);

            await loadTasks();

        } catch (err) {

            console.error(err);

            toast.error("Unable to delete task.");

        }

    };

    return (
        <DashboardLayout>

            <TaskToolbar
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <TaskStats tasks={tasks} />

            <TaskList
                tasks={tasks}
                onEdit={(task) => {
                    setSelectedTask(task);
                    setOpenModal(true);
                }}
                onDelete={(task) => {
                    setTaskToDelete(task);
                    setDeleteModalOpen(true);
                }}
            />

            <button
                onClick={() => {
                    setSelectedTask(null);
                    setOpenModal(true);
                }}
                className="
                    fixed
                    bottom-8
                    right-8
                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    rounded-full
                    p-5
                    shadow-xl
                    transition
                "
            >
                <Plus size={26} />
            </button>

            <TaskModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedTask(null);
                }}  
                onTaskAdded={loadTasks}
                selectedTask={selectedTask}
            />

            <DeleteTaskModal
                open={deleteModalOpen}
                task={taskToDelete}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setTaskToDelete(null);
                }}
                onConfirm={handleDelete}
            />

        </DashboardLayout>
    );
}

export default Dashboard;