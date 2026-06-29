import { request } from './apiClient';
import type { CheckoutRequest } from '../types';

export const orderApi = {
    checkout: async (data: CheckoutRequest): Promise<number> => {
        return request<number>('/orders/checkout', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    getMyOrders: async (pageIndex: number, pageSize: number, status?: number): Promise<import('../types/order').PagedResult<import('../types/order').OrderHistory>> => {
        let url = `/orders/my-orders?pageIndex=${pageIndex}&pageSize=${pageSize}`;
        if (status !== undefined && status !== null) {
            url += `&status=${status}`;
        }
        return request<import('../types/order').PagedResult<import('../types/order').OrderHistory>>(url);
    },
};
