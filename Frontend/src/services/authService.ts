import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';
import { request } from './apiClient';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthResponse['user'] | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as AuthResponse['user']) : null;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const auth = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  localStorage.setItem(TOKEN_KEY, auth.token);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));

  return auth;
}

export async function register(data: RegisterRequest): Promise<number> {
  return request<number>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function changePassword(data: any): Promise<any> {
  return request<any>('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
