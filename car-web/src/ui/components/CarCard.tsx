'use client'
import React from "react";
import { Car } from "@/domain/models/Car";
import { Link } from "react-router-dom";

function CarCard({ car, onDelete }: { car: Car; onDelete: (id: string) => void }) {

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-md">
      <h2 className="text-xl font-bold">{car.brand} {car.model}</h2>
      <p className="text-gray-600">Año: {car.year}</p>
      <p className="mt-2"><strong>Placa:</strong> {car.licensePlate}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/cars/edit/${car.id}`}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(car.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export { CarCard };
