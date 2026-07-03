export interface CheckoutRequest {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    paymentMethod: number; // 1: COD, 2: Bank, 3: VNPay, 4: Momo
    note?: string;
    voucherCode?: string;
}

export interface OrderHistory {
    orderId: number;
    orderDate: string;
    totalAmount: number;
    finalAmount: number;
    orderStatus: number;
    paymentMethod: number;
    paymentStatus: number;
    firstProductTitle: string;
    firstProductImageUrl: string;
    totalProductCount: number;
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
