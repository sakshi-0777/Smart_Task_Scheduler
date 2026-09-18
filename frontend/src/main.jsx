import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <App />

                <Toaster
                    position="top-center"
                    gutter={12}
                    toastOptions={{
                        duration: 3500,
                        style: {
                            borderRadius: "16px",
                            background: "#0f172a",
                            color: "#fff",
                            padding: "18px 20px",
                            fontSize: "15px",
                            fontWeight: "500",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                        },
                        success: {
                            iconTheme: {
                                primary: "#22c55e",
                                secondary: "#fff",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#fff",
                            },
                        },
                    }}
                />

            </AuthProvider>

        </BrowserRouter>

    </React.StrictMode>
);