import { LayoutDashboard } from "lucide-react";

function Logo() {
    return (
        <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4 shadow-lg">

                <LayoutDashboard
                    className="text-white"
                    size={30}
                />

            </div>

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Smart Task
                </h1>

                <p className="text-slate-300">
                    Scheduler
                </p>

            </div>

        </div>
    );
}

export default Logo;