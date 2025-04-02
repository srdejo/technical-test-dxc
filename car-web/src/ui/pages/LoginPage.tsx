'use client'
import { AuthService } from "@/domain/services/AuthService";
import { User } from "@/domain/models/User";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/application/context/AuthContext";


function LoginPage() {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Evita errores si el contexto es undefined
  }

  const { login } = authContext;

  const [credentials, setCredentials] = useState<User>({ usuario: "", clave: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.usuario || !credentials.clave) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }

    try {
      setLoading(true);
      await login(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      console.log(err)
      setError(
        err.response?.data?.message ||
        'Error al iniciar sesión. Verifique sus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nombre de Usuario</label>
            <input
              type="text"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              placeholder="Ingrese su nombre de usuario"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="clave"
              value={credentials.clave}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center mt-4">
          ¿No tienes una cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}

export { LoginPage }