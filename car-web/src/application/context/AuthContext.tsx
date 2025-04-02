import { Credentials } from "@/domain/models/Credentials";
import { User } from "@/domain/models/User";
import { AuthService } from "@/domain/services/AuthService";
import React, { createContext, useState, useEffect, ReactNode } from "react";


// Definir la estructura del contexto de autenticación
interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: Credentials) => Promise<void>;
    register: (userData: Credentials) => Promise<void>;
    logout: () => void;
}

// Crear el contexto con un valor inicial `undefined`
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir el tipo de las propiedades de `AuthProvider`
interface AuthProviderProps {
    children: ReactNode;
}

// Implementar el `AuthProvider`
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const authService = new AuthService();

    useEffect(() => {
        const initializeAuth = () => {
            const user = authService.getCurrentUser();
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials: Credentials) => {
        try {
            const data = await authService.login(credentials);
            setCurrentUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: Credentials) => {
        try {
            await authService.register(userData);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
