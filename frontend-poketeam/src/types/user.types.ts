
export interface User {
  id: number
  nombre: string
  email: string
  rol: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}


export interface RegisterInput {
  nombre: string
  email: string
  password: string
}


export interface LoginInput {
  username: string
  password: string
}


export interface AuthResponse {
  success: boolean
  msg: string
  data: {
    user: User
    token: string
  }
}
