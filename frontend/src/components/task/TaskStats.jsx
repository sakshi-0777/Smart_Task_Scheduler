import {
    ListTodo,
    Clock3,
    CheckCircle2,
    TriangleAlert,
} from "lucide-react";

import StatCard from "./StatCard";

function TaskStats({ tasks }) {

    const stats = {
        total: tasks.length,
        pending: tasks.filter(task => task.status === "PENDING").length,
        completed: tasks.filter(task => task.status === "COMPLETED").length,
        high: tasks.filter(task => task.priority === "HIGH").length,
    };

    const cards = [
        {
            title: "Total Tasks",
            value: stats.total,
            icon: ListTodo,
            color: "#2563EB",
        },
        {
            title: "Pending",
            value: stats.pending,
            icon: Clock3,
            color: "#F59E0B",
        },
        {
            title: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "#16A34A",
        },
        {
            title: "High Priority",
            value: stats.high,
            icon: TriangleAlert,
            color: "#DC2626",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map(card => (

                <StatCard
                    key={card.title}
                    {...card}
                />

            ))}

        </div>
    );
}

export default TaskStats;