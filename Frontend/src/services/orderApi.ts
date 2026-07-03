import { request } from './apiClient';
import type { CheckoutRequest, PagedResult, OrderHistory, OrderDto } from '../types';

export const orderApi = {
    checkout: async (data: CheckoutRequest): Promise<number> => {
        return request<number>('/orders/checkout', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    getMyOrders: async (pageIndex: number, pageSize: number, status?: number): Promise<PagedResult<OrderHistory>> => {
        let url = `/orders/my-orders?pageIndex=${pageIndex}&pageSize=${pageSize}`;
        if (status !== undefined && status !== null) {
            url += `&status=${status}`;
        }
        return request<PagedResult<OrderHistory>>(url);
    },
    getOrderById: async (id: number): Promise<OrderDto> => {
        return request<OrderDto>(`/orders/${id}`);
    },
    cancelOrder: async (id: number): Promise<{ success: boolean; message: string }> => {
        return request<{ success: boolean; message: string }>(`/orders/${id}/cancel`, {
            method: 'PUT',
        });
    },
};
