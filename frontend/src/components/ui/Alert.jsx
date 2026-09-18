import { CircleAlert } from "lucide-react";

function Alert({ message }) {

    if (!message) return null;

    return (
        <div className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-red-600
        ">
            <CircleAlert size={20} />

            <span>{message}</span>
        </div>
    );
}

export default Alert;