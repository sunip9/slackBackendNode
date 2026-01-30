export class UserResponseDto {
  id: number;
  email: string;

  constructor(user: { id: number; email: string; password?: string }) {
    this.id = user.id;
    this.email = user.email;
    // Explicitly exclude password and any other sensitive fields
  }

  static fromDatabase(user: any): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      email: user.email,
    });
  }
}
