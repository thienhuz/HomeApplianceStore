// Điểm xuất khẩu tập trung cho toàn bộ kiểu dữ liệu của Frontend.
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  imageUrl?: string;
  role: 'admin' | 'customer';
  createdAt: string;
}
export * from './api';
export * from './auth';
export * from './cart';
export * from './catalog';
export * from './productDetail';
export * from './address';
