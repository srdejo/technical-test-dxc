import { api } from "./api";
import { Car } from "@/domain/models/Car";

export class CarApi {
  
  async getAllCars(): Promise<Car[]> {
    const response = await api.get("/car");
    console.log('CarApi','getAllCars', response)
    return response.data;
  }

  async getCarById(id: string): Promise<Car> {
    const response = await api.get(`/car/${id}`);
    return response.data;
  }

  async createCar(carData: Car): Promise<Car> {
    const response = await api.post("/car", carData);
    return response.data;
  }

  async updateCar(id: string, carData: Car): Promise<Car> {
    const response = await api.put(`/car/${id}`, carData);
    return response.data;
  }

  async deleteCar(id: string): Promise<void> {
    await api.delete(`/car/${id}`);
  }

  async searchCars(query: string): Promise<Car[]> {
    const response = await api.get(`/car/search?query=${query}`);
    return response.data;
  }

  async filterCars(filter: string, value: string): Promise<Car[]> {
    const response = await api.get(`/car/filter?${filter}=${value}`);
    return response.data;
  }
}
