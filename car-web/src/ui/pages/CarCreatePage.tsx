'use client'
import { CarService } from "@/domain/services/CarService";
import { Car } from "@/domain/models/Car";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const carService = new CarService();

function CarCreatePage() {
  const [carData, setCarData] = useState<Car>({
    id: "",
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    color: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const validateCarData = (): boolean => {
    const currentYear = new Date().getFullYear();
    if (!carData.brand || !carData.model || !carData.licensePlate || !carData.color) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!validateCarData()) return;

    try {
      setLoading(true);
      await carService.createCar(carData);
      navigate("/cars");
    } catch (err: any) {
      console.log(err.response)
      setError(err.response?.data?.error || "Error al registrar el auto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Auto</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="text" name="brand" value={carData.brand} onChange={handleChange} placeholder="Marca" required />
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="text" name="model" value={carData.model} onChange={handleChange} placeholder="Modelo" required />
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="text" name="year" value={carData.year} onChange={handleChange} placeholder="Año" required />
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="text" name="licensePlate" value={carData.licensePlate} onChange={handleChange} placeholder="Número de Placa" required />
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="text" name="color" value={carData.color} onChange={handleChange} placeholder="Color" required />
        <input className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleFileChange} />
        <div className="flex justify-end gap-2">
          <button type="button" className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition" onClick={() => navigate("/cars")}>
            Cancelar
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Auto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export { CarCreatePage };