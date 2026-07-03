import { request } from './apiClient';
import type { VoucherDto } from '../types';

export const voucherApi = {
    getAvailableVouchers: async (subtotal: number): Promise<VoucherDto[]> => {
        return request<VoucherDto[]>(`/vouchers/available?subtotal=${subtotal}`);
    },
};

