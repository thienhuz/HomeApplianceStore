import type { ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5227/api/v1';

export async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const isFormData = options?.body instanceof FormData;
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (options?.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || `Lỗi kết nối API: ${response.statusText} (${response.status})`;
    throw new Error(message);
  }

  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Lỗi xử lý nghiệp vụ tại C# Backend');
  }

  return result.data;
}
