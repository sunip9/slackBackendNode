import { UserResponseDto } from "./user-response.dto";

export class AuthResponseDto {
  user: UserResponseDto;
  token: string;

  constructor(user: UserResponseDto, token: string) {
    this.user = user;
    this.token = token;
  }

  static create(user: any, token: string): AuthResponseDto {
    return new AuthResponseDto(UserResponseDto.fromDatabase(user), token);
  }
}
