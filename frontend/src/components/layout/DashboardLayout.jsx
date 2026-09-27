import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="h-screen bg-slate-100 flex overflow-hidden">

            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Fixed Navbar */}
                <div className="shrink-0">
                    <Navbar />
                </div>

                {/* Only this area scrolls */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;