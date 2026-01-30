import { User } from "../types/user.types";
import { UserResponseDto } from "../dtos/user-response.dto";

export interface IUserService {
  getAllUsers(): Promise<{ count: number; users: UserResponseDto[] }>;
  getUserById(id: number): Promise<UserResponseDto[]>;
  createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<UserResponseDto[]>;
  updateUser(
    id: number,
    username?: string,
    password?: string,
    email?: string,
  ): Promise<UserResponseDto[]>;
  deleteUser(id: number): Promise<UserResponseDto[]>;
}
