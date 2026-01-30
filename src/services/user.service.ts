import { IUserService } from "../interfaces/user-service.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserResponseDto } from "../dtos/user-response.dto";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<{ count: number; users: UserResponseDto[] }> {
    const users = await this.userRepository.find();
    const { count } = await this.userRepository.count();

    const userDtos = users.map((user) => UserResponseDto.fromDatabase(user));

    return {
      count: parseInt(count),
      users: userDtos,
    };
  }

  async getUserById(id: number): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findById(id);
    return users.map((user) => UserResponseDto.fromDatabase(user));
  }

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<UserResponseDto[]> {
    const users = await this.userRepository.insert(username, password, email);
    return users.map((user) => UserResponseDto.fromDatabase(user));
  }

  async updateUser(
    id: number,
    username?: string,
    password?: string,
    email?: string,
  ): Promise<UserResponseDto[]> {
    const users = await this.userRepository.update(
      id,
      username,
      password,
      email,
    );
    return users.map((user) => UserResponseDto.fromDatabase(user));
  }

  async deleteUser(id: number): Promise<UserResponseDto[]> {
    const users = await this.userRepository.delete(id);
    return users.map((user) => UserResponseDto.fromDatabase(user));
  }
}
