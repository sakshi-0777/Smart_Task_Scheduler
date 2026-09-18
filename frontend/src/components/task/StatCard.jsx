import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            border
            border-slate-200
        ">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>

                </div>

                <div
                    className="h-10 w-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    <Icon
                        size={20}
                        color="white"
                    />
                </div>

            </div>

            <div className="mt-6 flex items-center text-green-600 text-sm">

                <ArrowUpRight size={16} />

                <span className="ml-2">

                    Updated just now

                </span>

            </div>

        </div>
    );
}

export default StatCard;