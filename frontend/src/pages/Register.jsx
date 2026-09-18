import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await register(formData);

            toast.success("Account created successfully!");

            navigate("/");

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data || "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Join Task Scheduler today
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="relative">

                        <User
                            size={20}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full h-14 rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                        />

                    </div>

                    <div className="relative">

                        <Mail
                            size={20}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full h-14 rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                        />

                    </div>

                    <div className="relative">

                        <Lock
                            size={20}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full h-14 rounded-xl border border-slate-300 pl-12 pr-12 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-slate-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition flex justify-center items-center gap-2 disabled:opacity-60"
                    >
                        {loading ? (
                            "Creating..."
                        ) : (
                            <>
                                Create Account
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                </form>

                <p className="text-center mt-8 text-slate-600">

                    Already have an account?

                    <Link
                        to="/"
                        className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;