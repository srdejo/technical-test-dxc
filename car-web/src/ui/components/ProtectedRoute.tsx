'use client'
import { AuthContext } from "@/application/context/AuthContext";
import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // Evita errores si el contexto es undefined
    }

    const { isAuthenticated, loading } = authContext;


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="text-lg text-gray-700 animate-pulse">Cargando...</span>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export { ProtectedRoute };
