import { api } from "./api";

export const AdminService = {
    Register: async (adminData) => {
        return await api.post("/admins/register", adminData);
    },

    Login: async (adminData) => {
        const response = await api.post("/admins/login", adminData);
        const token = response?.access_token;
        if (!token) {
            throw new Error("Token tidak ditemukan dalam respon server");
        }

        return response;
    },

    GetMe: async () => {
        return await api.get("/admins/me");
    }
};