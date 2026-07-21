import axios from 'axios'
import { API_BASE_URL } from '../utils/constant'


// =============================
// Ambil Api dari constant
// =============================
export const api = axios.create({
    baseURL: API_BASE_URL,
});



// =============================
// gunakan interceptor(Pencegat) untuk mengambil token di localStorage
// =============================
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
});

// =============================
// Pastikan Token ada jika tidak (401) tendang user ke halaman login
// =============================
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            if(window.location.pathname.startsWith('/Admins')){
                if (window.location.pathname !== '/Admins/AuthAdmin/LoginAdmin') {
                    window.location.href = '/Admins/AuthAdmin/LoginAdmin';
                }
            } else {
                if (window.location.pathname !== '/Login' && window.location.pathname !== '/login') {
                    window.location.href = '/Login';
                }
            }
        }
        return Promise.reject(error);
    }
);