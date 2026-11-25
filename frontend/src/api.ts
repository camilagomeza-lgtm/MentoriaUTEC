import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({ baseURL: "https://mentoriautec-api.aaron-navarro.workers.dev/api" })

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
)

api.interceptors.response.use(
    (response: any) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

//Interfaces 
export interface UserRegisterBody {
    name: string;
    email: string;
    password: string;
}
export interface UserRegisterAns {
    id: number;
    name: string;
    email: string;
}
export interface UserLogin {
    email: string; 
    password: string;
}

//Funciones con conexión
export async function registerUser(user: UserRegisterBody): Promise<UserRegisterAns> {
    const res = await api.post("/api/auth/register", user)
    return res.data
}
export async function loginUser(user: UserLogin): Promise<string> {
    const res = await api.post("/api/auth/login", user)
    return res.data
}

