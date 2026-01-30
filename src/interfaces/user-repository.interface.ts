import { User, CreateUserInput, UpdateUserInput } from "../types/user.types";

export interface IUserRepository {
  find(): Promise<User[]>;
  findById(id: number): Promise<User[]>;
  findOne(email: string): Promise<User | undefined>;
  build(email: string, password: string): Promise<User>;
  insert(username: string, password: string, email: string): Promise<User[]>;
  update(
    id: number,
    username?: string,
    password?: string,
    email?: string,
  ): Promise<User[]>;
  delete(id: number): Promise<User[]>;
  count(): Promise<{ count: string }>;
}
