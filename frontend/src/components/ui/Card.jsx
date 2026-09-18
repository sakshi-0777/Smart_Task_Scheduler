function Card({ children }) {
    return (
        <div
            className="
                bg-white/90
                backdrop-blur-xl
                border
                border-white/40
                rounded-3xl
                shadow-2xl
                p-10
                transition-all
                duration-300
            "
        >
            {children}
        </div>
    );
}

export default Card;