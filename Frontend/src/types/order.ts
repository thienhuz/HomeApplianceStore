export interface CheckoutRequest {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    paymentMethod: number; // 1: COD, 2: Bank, 3: VNPay, 4: Momo
    note?: string;
}

export interface OrderHistory {
    orderId: number;
    orderDate: string;
    totalAmount: number;
    orderStatus: number;
    paymentMethod: number;
    paymentStatus: number;
    firstProductTitle: string;
    firstProductImageUrl: string;
    totalProductCount: number;
}

export interface PagedResult<T> {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface OrderDetailItem {
    productId: number;
    productName: string;
    imageUrl: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderDto {
    orderId: number;
    orderDate: string;
    orderStatus: number;
    paymentMethod: number;
    paymentStatus: number;
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    note?: string;
    totalAmount: number;
    discountAmount?: number;
    finalAmount: number;
    items: OrderDetailItem[];
}
