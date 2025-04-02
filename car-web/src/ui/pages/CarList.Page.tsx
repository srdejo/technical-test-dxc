'use client'
import { Car } from "@/domain/models/Car";
import { CarService } from "@/domain/services/CarService";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CarCard } from "../components/CarCard";

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [carToDelete, setCarToDelete] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const carService = new CarService();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getAllCars();
      setCars(data);
      setFilteredCars(data);
      setIsFiltered(false);
    } catch (err) {
      setError("Error al cargar los autos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setCarToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteCar = async () => {
    if (carToDelete === null) return;
    try {
      await carService.deleteCar(carToDelete);
      setCars((prev) => prev.filter((car) => car.id !== carToDelete));
      setFilteredCars((prev) => prev.filter((car) => car.id !== carToDelete));
      setShowDeleteModal(false);
      setCarToDelete("");
    } catch (err) {
      setError("Error al eliminar el auto. Intenta nuevamente.");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await carService.searchCars(query);
      setFilteredCars(data);
      setIsFiltered(true);
    } catch (err) {
      setError("Error al buscar autos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filterType: string, value: string) => {
    try {
      setLoading(true);
      const data = await carService.filterCars(filterType, value);
      setFilteredCars(data);
      setIsFiltered(true);
    } catch (err) {
      setError("Error al aplicar filtros.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilteredCars(cars);
    setIsFiltered(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mis Autos</h2>
        <Link to="/cars/create" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Registrar Nuevo Auto
        </Link>
      </div>

      {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

      {isFiltered && (
        <div className="bg-blue-100 text-blue-700 p-3 rounded mb-3">
          Mostrando {filteredCars.length} resultados
          <button className="text-blue-500 ml-2" onClick={handleResetFilters}>
            Mostrar todos
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center mt-5 text-gray-500">Cargando...</div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onDelete={confirmDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p>No se encontraron autos {isFiltered ? "con los filtros aplicados" : ""}.</p>
          {isFiltered && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2" onClick={handleResetFilters}>
              Mostrar todos los autos
            </button>
          )}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
            <p>¿Estás seguro que deseas eliminar este auto? Esta acción no se puede deshacer.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={deleteCar}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { CarList };