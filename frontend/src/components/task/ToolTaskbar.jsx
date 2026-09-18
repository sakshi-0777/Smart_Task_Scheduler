import { Search } from "lucide-react";

function TaskToolbar({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm  p-6 mb-8 ">

            <div className="grid lg:grid-cols-4 gap-4 ">

                <div className="relative bg-slate-100 rounded-xl">

                    <Search
                        size={18}
                        className="absolute left-4 top-4 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full h-12 rounded-xl pl-11 pr-4 focus:ring-2
                        focus:ring-blue-500 outline-none"
                    />

                </div>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="h-12 bg-slate-100 rounded-xl  px-4"
                >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) =>
                        setPriorityFilter(e.target.value)
                    }
                    className="h-12 bg-slate-100 rounded-xl px-4"
                >
                    <option value="ALL">All Priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                    className="h-12 bg-slate-100 rounded-xl px-4"
                >
                    <option value="DATE">
                        Due Date
                    </option>

                    <option value="TITLE">
                        Title
                    </option>

                    <option value="PRIORITY">
                        Priority
                    </option>

                </select>

            </div>

        </div>

    );

}

export default TaskToolbar;