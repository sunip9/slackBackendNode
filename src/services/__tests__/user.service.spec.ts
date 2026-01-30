import { UserService } from "../user.service";
import { MockUserRepository } from "../../test/mocks/mock-user-repository";
import { UserFixture } from "../../test/fixtures/user.fixture";

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    mockUserRepository.reset();
  });

  describe("getAllUsers", () => {
    it("should return all users with count", async () => {
      const users = UserFixture.createUsers(3);
      mockUserRepository.seed(users);

      const result = await userService.getAllUsers();

      expect(result.count).toBe(3);
      expect(result.users).toHaveLength(3);
      expect(result.users[0]).toHaveProperty("id");
      expect(result.users[0]).toHaveProperty("email");
      expect(result.users[0]).not.toHaveProperty("password");
    });

    it("should return empty array when no users exist", async () => {
      const result = await userService.getAllUsers();

      expect(result.count).toBe(0);
      expect(result.users).toHaveLength(0);
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      const user = UserFixture.createUser({ id: 1 });
      mockUserRepository.seed([user]);

      const result = await userService.getUserById(1);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0]).not.toHaveProperty("password");
    });

    it("should return empty array when user not found", async () => {
      const result = await userService.getUserById(999);

      expect(result).toHaveLength(0);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const result = await userService.createUser(
        "testuser",
        "password123",
        "test@example.com",
      );

      expect(result).toHaveLength(1);
      expect(result[0].email).toBe("test@example.com");
      expect(result[0]).not.toHaveProperty("password");
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const user = UserFixture.createUser({ id: 1, email: "old@example.com" });
      mockUserRepository.seed([user]);

      const result = await userService.updateUser(
        1,
        "updated",
        "newpass",
        "new@example.com",
      );

      expect(result).toHaveLength(1);
      expect(result[0].email).toBe("new@example.com");
    });

    it("should return empty array when user not found", async () => {
      const result = await userService.updateUser(999, "user", "pass", "email");

      expect(result).toHaveLength(0);
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const user = UserFixture.createUser({ id: 1 });
      mockUserRepository.seed([user]);

      const result = await userService.deleteUser(1);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);

      const remainingUsers = await mockUserRepository.find();
      expect(remainingUsers).toHaveLength(0);
    });

    it("should return empty array when user not found", async () => {
      const result = await userService.deleteUser(999);

      expect(result).toHaveLength(0);
    });
  });
});
