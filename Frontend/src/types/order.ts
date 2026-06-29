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
