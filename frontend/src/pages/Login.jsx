import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";

import Logo from "../components/ui/Logo";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { login as loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/userService";

import Alert from "../components/ui/Alert";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const data = await loginUser(email, password);

            login(data.token, null);

            const user = await getCurrentUser();

            login(data.token, user);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900">

            <div className="container mx-auto flex min-h-screen">

                {/* Left Section */}

                <div className="hidden lg:flex w-1/2 items-center justify-center px-16">

                    <div className="max-w-xl">

                        <Logo />

                        <h1 className="mt-10 text-6xl font-bold text-white leading-tight">
                            Organize your work.
                            <br />
                            Stay productive.
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            Manage your daily tasks, track your progress,
                            prioritize work and stay focused with your
                            Smart Task Scheduler.
                        </p>

                    </div>

                </div>

                {/* Right Section */}

                <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10">

                    <div className="w-full max-w-md">

                        <Card>

                            <h2 className="text-center text-3xl font-bold text-slate-800">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-center text-slate-500">
                                Sign in to your account
                            </p>

                            <form
                                onSubmit={handleLogin}
                                className="mt-8 space-y-6"
                            >

                                <Input
                                    label="Email"
                                    icon={Mail}
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <Input
                                    label="Password"
                                    icon={LockKeyhole}
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <Alert message={error} />

                                <Button
                                    type="submit"
                                    loading={loading}
                                >
                                    Login
                                </Button>

                            </form>

                            <div className="mt-8 border-t pt-6 text-center">

                                <p className="text-slate-600">

                                    Don't have an account?

                                    <Link
                                        to="/register"
                                        className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Register
                                    </Link>

                                </p>

                            </div>

                        </Card>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;