// Kiểu dữ liệu dùng chung cho lớp giao tiếp API.

/** Cấu trúc phản hồi chuẩn từ Backend. */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Kết quả phân trang trả về từ API. */
export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
