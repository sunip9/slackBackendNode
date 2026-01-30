export interface User {
  id: number;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  username?: string;
  password?: string;
  email?: string;
}

export interface UserPayload {
  id: number;
  email: string;
}
