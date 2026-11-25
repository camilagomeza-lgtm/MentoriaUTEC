import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider ({ children }: { children:ReactNode }) {
    const [token, setToken] = useState(localStorage.getItem("token"))

    function login (newToken:string) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logout () {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={ {token, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth () {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("Se tiene que hacer uso de Auth Provider");
    return ctx;
}