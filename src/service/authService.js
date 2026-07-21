import { api } from "./api";

export const AuthService = {
    register: async (userData)=>{
        const response = await api.post('/users/register', userData);
        return response;
    },

    login: async (userData) => {
        const response = await api.post('/users/login',userData);
        const token = response?.access_token || response?.data?.access_token || response?.token;

        if(!token){
            throw new Error(`Token tidak valid atau kadaluarsa ${JSON.stringify(response)}`);
        }

        return {
            access_token: token,
            token_type: response?.token_type || 'bearer'
        }

    }
}