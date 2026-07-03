export interface VoucherDto {
    voucherId: number;
    voucherCode: string;
    discountAmount: number;
    discountType: 'fixed' | 'percent';
    minOrderValue?: number;
    maxDiscount?: number;
    expiryDate: string;
    usageLimit?: number;
    usedCount?: number;
}
