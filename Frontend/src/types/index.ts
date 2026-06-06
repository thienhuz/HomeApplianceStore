export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}
