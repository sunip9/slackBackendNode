import { IAuthService } from "../interfaces/auth-service.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { SignUpInput, SignInInput } from "../types/auth.types";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "./password";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-secret-change-in-production";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signUp(input: SignUpInput): Promise<AuthResponseDto> {
    const { email, password } = input;

    // Check if user exists
    const existingUser = await this.userRepository.findOne(email);
    if (existingUser) {
      throw new BadRequestError("Email already in use!");
    }

    // Create user
    const user = await this.userRepository.build(email, password);

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    return AuthResponseDto.create(user, token);
  }

  async signIn(input: SignInInput): Promise<AuthResponseDto> {
    const { email, password } = input;

    // Find user
    const existingUser = await this.userRepository.findOne(email);
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Verify password
    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Generate JWT
    const token = this.generateToken(existingUser.id, existingUser.email);

    return AuthResponseDto.create(existingUser, token);
  }

  private generateToken(id: number, email: string): string {
    return Jwt.sign(
      {
        id,
        email,
      },
      JWT_SECRET,
    );
  }
}
