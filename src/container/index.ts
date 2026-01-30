import { IUserRepository } from "../interfaces/user-repository.interface";
import { IAuthService } from "../interfaces/auth-service.interface";
import { IUserService } from "../interfaces/user-service.interface";
import UserRepo from "../repos/user-repo";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

/**
 * Simple Dependency Injection Container
 * For production, consider using tsyringe, typedi, or inversify
 */
class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices(): void {
    // Register repositories
    this.services.set("UserRepository", UserRepo);

    // Register services
    this.services.set(
      "AuthService",
      new AuthService(this.get<IUserRepository>("UserRepository")),
    );
    this.services.set(
      "UserService",
      new UserService(this.get<IUserRepository>("UserRepository")),
    );
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found in container`);
    }
    return service as T;
  }
}

// Export singleton instance
export const container = Container.getInstance();

// Export helper functions for common services
export const getAuthService = (): IAuthService =>
  container.get<IAuthService>("AuthService");

export const getUserService = (): IUserService =>
  container.get<IUserService>("UserService");

export const getUserRepository = (): IUserRepository =>
  container.get<IUserRepository>("UserRepository");
