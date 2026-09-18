import api from "../api/axios";

export const login = async (email, password) => {

    const response = await api.post("/users/login", {
        email,
        password,
    });

    return response.data;
};

export const register = async (user) => {

    const response = await api.post("/users/register", user);

    return response.data;
};

export const changePassword = async(currentPassword, newPassword) => {
    const response = await api.put("/users/change-password",
        {
            currentPassword,
            newPassword
        }
    );
    return response.data;
};