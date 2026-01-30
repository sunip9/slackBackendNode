import { User } from "../types/user.types";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { SignUpInput, SignInInput } from "../types/auth.types";

export interface IAuthService {
  signUp(input: SignUpInput): Promise<AuthResponseDto>;
  signIn(input: SignInInput): Promise<AuthResponseDto>;
}
