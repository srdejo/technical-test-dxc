'use client'
import { CarService } from "@/domain/services/CarService";
import { Car } from "@/domain/models/Car";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/application/context/AuthContext";


interface Stats {
    totalCars: number;
    latestCars: Car[];
}

const DashboardPage: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // Evita errores si el contexto es undefined
    }

    const { currentUser } = authContext;

    const [stats, setStats] = useState<Stats>({ totalCars: 0, latestCars: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const carService = new CarService();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const cars: Car[] = await carService.getAllCars();
                setStats({
                    totalCars: cars.length,
                    latestCars: cars.slice(0, 3),
                });
            } catch (error) {
                console.error("Error al obtener estadísticas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center mt-5 text-gray-600">Cargando...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">
                Bienvenido, {currentUser?.usuario}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tarjeta de estadísticas */}
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-3xl font-bold">{stats.totalCars}</h3>
                    <p className="text-gray-600">Total de Autos Registrados</p>
                    <Link to="/cars" className="mt-3 block bg-blue-500 text-white py-2 px-4 rounded-lg">
                        Ver Todos
                    </Link>
                </div>

                {/* Acciones rápidas */}
                <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
                    <h5 className="text-lg font-semibold mb-3">Acciones Rápidas</h5>
                    <div className="flex gap-2">
                        <Link to="/cars/create" className="bg-green-500 text-white py-2 px-4 rounded-lg">
                            Registrar Nuevo Auto
                        </Link>
                        <Link to="/cars" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                            Gestionar Autos
                        </Link>
                    </div>
                </div>
            </div>

            {/* Últimos autos registrados */}
            <h4 className="text-xl font-semibold mt-6 mb-3">Últimos Autos Registrados</h4>
            {stats.latestCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.latestCars.map((car) => (
                        <div key={car.id} className="bg-white shadow-md rounded-lg p-4">
                            <h5 className="text-lg font-semibold">
                                {car.brand} {car.model}
                            </h5>
                            <p className="text-gray-600">Año: {car.year}</p>
                            <p className="text-gray-600">Placa: {car.licensePlate}</p>
                            <p className="text-gray-600">Color: {car.color}</p>
                            <Link to={`/cars/edit/${car.id}`} className="mt-3 block bg-indigo-500 text-white py-2 px-4 rounded-lg text-center">
                                Editar
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No tienes autos registrados. ¡Registra tu primer auto ahora!</p>
            )}
        </div>
    );
};

export { DashboardPage };
