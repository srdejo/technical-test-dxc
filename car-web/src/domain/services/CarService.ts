import { Car } from "@/domain/models/Car";
import { CarApi } from "@/infrastructure/api/CarApi";

export class CarService {
  private carApi: CarApi;

  constructor() {
    this.carApi = new CarApi();
  }

  async getAllCars(): Promise<Car[]> {
    return this.carApi.getAllCars();
  }

  async getCarById(id: string): Promise<Car> {
    return this.carApi.getCarById(id);
  }

  async createCar(carData: Car): Promise<Car> {
    return this.carApi.createCar(carData);
  }

  async updateCar(id: string, carData: Car): Promise<Car> {
    return this.carApi.updateCar(id, carData);
  }

  async deleteCar(id: string): Promise<void> {
    return this.carApi.deleteCar(id);
  }

  async searchCars(query: string): Promise<Car[]> {
    return this.carApi.searchCars(query);
  }

  async filterCars(filter: string, value: string): Promise<Car[]> {
    return this.carApi.filterCars(filter, value);
  }
}
