import { User } from "../../types/user.types";

export class UserFixture {
  static createUser(overrides?: Partial<User>): User {
    return {
      id: 1,
      email: "test@example.com",
      password: "hashedPassword123",
      created_at: new Date(),
      updated_at: new Date(),
      ...overrides,
    };
  }

  static createUsers(count: number): User[] {
    return Array.from({ length: count }, (_, i) =>
      this.createUser({
        id: i + 1,
        email: `test${i + 1}@example.com`,
      }),
    );
  }

  static createMockUser(overrides?: Partial<User>): User {
    return {
      id: 999,
      email: "mock@example.com",
      password: "$2a$10$mockHashedPassword",
      created_at: new Date("2024-01-01"),
      updated_at: new Date("2024-01-01"),
      ...overrides,
    };
  }
}
