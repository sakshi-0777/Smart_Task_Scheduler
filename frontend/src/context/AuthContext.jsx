import { createContext, useContext, useState } from "react";
import { updateCurrentUser } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const [user, setUser] = useState(() => {

        const saved = localStorage.getItem("user");

        return saved ? JSON.parse(saved) : null;

    });

    const login = (jwtToken, userData) => {

        localStorage.setItem("token", jwtToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setToken(jwtToken);

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

    };

    const updateUser = async (userData) => {

        const updatedUser = await updateCurrentUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        return updatedUser;
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                updateUser,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {
    return useContext(AuthContext);
}