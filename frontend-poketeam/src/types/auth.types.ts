// src/types/auth.types.ts

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}
