'use client'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarService } from "@/domain/services/CarService";
import { Car } from "@/domain/models/Car";

const CarEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const carService = new CarService();
    if (!id)
        return

    const [carData, setCarData] = useState<Car>({
        id: "",
        brand: "",
        model: "",
        year: "",
        licensePlate: "",
        color: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const data: Car = await carService.getCarById(id);
                setCarData(data);
            } catch (err) {
                setError("Error al cargar los datos del auto.");
            }
        };
        fetchCarData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCarData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        console.log("Datos que se enviarán:", carData); // Verifica si son los datos correctos    

        try {
            await carService.updateCar(id, carData);
            navigate("/cars");
        } catch (err: any) {
            setError(err.response?.data?.error || "Error al actualizar el auto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Editar Auto</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="brand"
                    value={carData.brand}
                    onChange={handleChange}
                    placeholder="Marca"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="model"
                    value={carData.model}
                    onChange={handleChange}
                    placeholder="Modelo"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="year"
                    value={carData.year}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="licensePlate"
                    value={carData.licensePlate}
                    onChange={handleChange}
                    placeholder="Número de Placa"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="color"
                    value={carData.color}
                    onChange={handleChange}
                    placeholder="Color"
                    className="w-full p-2 border rounded"
                    required
                />
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 transition"
                        onClick={() => navigate("/cars")}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Actualizar Auto"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export { CarEditPage };