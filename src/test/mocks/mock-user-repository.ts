import { IUserRepository } from "../../interfaces/user-repository.interface";
import { User } from "../../types/user.types";

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async find(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User[]> {
    const user = this.users.find((u) => u.id === id);
    return user ? [user] : [];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async build(email: string, password: string): Promise<User> {
    const user: User = {
      id: this.users.length + 1,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async insert(
    username: string,
    password: string,
    email: string,
  ): Promise<User[]> {
    const user: User = {
      id: this.users.length + 1,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(user);
    return [user];
  }

  async update(
    id: number,
    username?: string,
    password?: string,
    email?: string,
  ): Promise<User[]> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        email: email || this.users[index].email,
        password: password || this.users[index].password,
        updated_at: new Date(),
      };
      return [this.users[index]];
    }
    return [];
  }

  async delete(id: number): Promise<User[]> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      const user = this.users[index];
      this.users.splice(index, 1);
      return [user];
    }
    return [];
  }

  async count(): Promise<{ count: string }> {
    return { count: this.users.length.toString() };
  }

  // Helper methods for testing
  reset(): void {
    this.users = [];
  }

  seed(users: User[]): void {
    this.users = [...users];
  }
}
