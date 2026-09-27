import api from "../api/axios";

export const getCurrentUser = async () => {

    const response = await api.get("/users/me");

    return response.data;
};

export const updateCurrentUser = async (userData) => {

    const response = await api.put("/users/me", {
        name: userData.name,
        email: userData.email,
    });

    return response.data;
};