import { ArrowRight, LoaderCircle } from "lucide-react";

function Button({
    children,
    type = "button",
    loading = false,
    onClick,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`
                w-full
                h-14
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                active:scale-95
                text-white
                font-semibold
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-70
                disabled:cursor-not-allowed
                shadow-lg
                hover:shadow-blue-500/30
                ${className}
            `}
        >
            {loading ? (
                <>
                    <LoaderCircle className="animate-spin" size={20} />
                    Signing In...
                </>
            ) : (
                <>
                    {children}
                    <ArrowRight size={18} />
                </>
            )}
        </button>
    );
}

export default Button;