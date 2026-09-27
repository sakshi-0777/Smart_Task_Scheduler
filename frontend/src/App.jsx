import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/Settings";
import logo from "./assets/logo.png";
import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/change-password"
                element={
                    <ProtectedRoute>

                        <ChangePassword />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-task"
                element={
                    <ProtectedRoute>
                        <AddTask />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );
}

export default App;