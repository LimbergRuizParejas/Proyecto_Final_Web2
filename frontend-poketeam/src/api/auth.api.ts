// src/api/auth.api.ts

import api from './api';
import type {
  LoginInput,
  RegisterInput,
  AuthResponse
} from '../types/user.types';


export const loginUser = (data: LoginInput) => {
  return api.post<AuthResponse>('/auth/login', data); 
}


export const registerUser = (data: RegisterInput) => {
  return api.post<AuthResponse>('/auth/register', data); 
}


export const getProfile = () => {
  return api.get<AuthResponse>('/auth/profile'); 
}
