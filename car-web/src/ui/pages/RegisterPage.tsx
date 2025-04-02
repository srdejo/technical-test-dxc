'use client'
import { AuthContext } from "@/application/context/AuthContext";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
  usuario: string;
  email: string;
  clave: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    usuario: "",
    email: "",
    clave: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Evita errores si el contexto es undefined
  }

  const { register } = authContext;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!userData.usuario || !userData.clave) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (userData.clave !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (userData.clave.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...registrationData } = userData;
      await register(registrationData);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Registrarse</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre de Usuario</label>
          <input
            type="text"
            name="usuario"
            value={userData.usuario}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="clave"
            value={userData.clave}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Debe tener al menos 6 caracteres.</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      
      <p className="text-center text-sm mt-4">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export { RegisterPage };