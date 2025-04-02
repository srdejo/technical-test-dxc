import { api } from "./api";
import { User } from "@/domain/models/User";

export class AuthApi {
  async register(userData: User): Promise<any> {
    const response = await api.post("/auth/register", userData);
    return response.data;
  }

  async login(credentials: User): Promise<any> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  }
}
