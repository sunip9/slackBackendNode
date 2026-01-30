import { AuthService } from "../auth.service";
import { MockUserRepository } from "../../test/mocks/mock-user-repository";
import { UserFixture } from "../../test/fixtures/user.fixture";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../services/password";

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    authService = new AuthService(mockUserRepository);
  });

  afterEach(() => {
    mockUserRepository.reset();
  });

  describe("signUp", () => {
    it("should create a new user successfully", async () => {
      const input = {
        email: "newuser@example.com",
        password: "Test@1234",
      };

      const result = await authService.signUp(input);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(input.email);
      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe("string");
    });

    it("should throw BadRequestError if email already exists", async () => {
      const existingUser = UserFixture.createUser({
        email: "existing@example.com",
      });
      mockUserRepository.seed([existingUser]);

      const input = {
        email: "existing@example.com",
        password: "Test@1234",
      };

      await expect(authService.signUp(input)).rejects.toThrow(BadRequestError);
      await expect(authService.signUp(input)).rejects.toThrow(
        "Email already in use!",
      );
    });

    it("should hash the password before storing", async () => {
      const input = {
        email: "test@example.com",
        password: "plainPassword",
      };

      await authService.signUp(input);

      const user = await mockUserRepository.findOne(input.email);
      expect(user).toBeDefined();
      expect(user?.password).not.toBe(input.password);
      expect(user?.password).toContain(".");
    });
  });

  describe("signIn", () => {
    it("should sign in successfully with valid credentials", async () => {
      const password = "Test@1234";
      const hashedPassword = await Password.tohash(password);
      const existingUser = UserFixture.createUser({
        email: "test@example.com",
        password: hashedPassword,
      });
      mockUserRepository.seed([existingUser]);

      const input = {
        email: "test@example.com",
        password: password,
      };

      const result = await authService.signIn(input);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(input.email);
      expect(result.token).toBeDefined();
    });

    it("should throw BadRequestError if user does not exist", async () => {
      const input = {
        email: "nonexistent@example.com",
        password: "Test@1234",
      };

      await expect(authService.signIn(input)).rejects.toThrow(BadRequestError);
      await expect(authService.signIn(input)).rejects.toThrow(
        "Invalid credentials!",
      );
    });

    it("should throw BadRequestError if password is incorrect", async () => {
      const hashedPassword = await Password.tohash("correctPassword");
      const existingUser = UserFixture.createUser({
        email: "test@example.com",
        password: hashedPassword,
      });
      mockUserRepository.seed([existingUser]);

      const input = {
        email: "test@example.com",
        password: "wrongPassword",
      };

      await expect(authService.signIn(input)).rejects.toThrow(BadRequestError);
      await expect(authService.signIn(input)).rejects.toThrow(
        "Invalid credentials!",
      );
    });
  });
});
