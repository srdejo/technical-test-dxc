import { AuthApi } from "@/infrastructure/api/AuthApi";
import { User } from "@/domain/models/User";

export class AuthService {
    private authApi: AuthApi;

    constructor() {
        this.authApi = new AuthApi();
    }

    async register(userData: User): Promise<any> {
        return await this.authApi.register(userData);
    }

    async login(credentials: User): Promise<any> {
        this.logout();
        const response = await this.authApi.login(credentials);

        if (response.token) {
            localStorage.setItem("token", response.token);
        }
        return response;
    }

    logout(): void {
        localStorage.removeItem("token");
    }

    getCurrentUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) as User : null;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }

}
