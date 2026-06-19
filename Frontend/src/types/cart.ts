// Kiểu dữ liệu cho giỏ hàng (khớp CartDto/CartItemDto ở Backend).

export interface CartItem {
  productId: number;
  brand: string;
  title: string;
  imageUrl?: string | null;
  quantity: number;
  unitPrice: number;
  price: string; // đơn giá đã định dạng
  lineTotal: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  distinctCount: number;
  subtotal: number;
  freeShipping: boolean;
}
