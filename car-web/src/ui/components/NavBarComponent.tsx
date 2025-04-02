'use client'
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/application/context/AuthContext";

function NavBarComponent() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
  
    if (!authContext) {
      return null; // Evita errores si el contexto es undefined
    }
  
    const { currentUser, isAuthenticated, logout } = authContext;
  
    const handleLogout = () => {
        navigate('/login');
    };


    return (
        <nav className="bg-gray-900 text-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Car Manager
                </Link>

                <div className="hidden md:flex space-x-4">
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" className="hover:text-gray-300">
                                Dashboard
                            </Link>
                            <Link to="/cars" className="hover:text-gray-300">
                                Mis Autos
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span className="hidden md:inline text-sm text-gray-300">
                                Bienvenido, {currentUser?.usuario}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export { NavBarComponent };