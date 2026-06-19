import type { Cart } from '../types';
import { request } from './apiClient';

export const cartApi = {
    getCart: async (): Promise<Cart> => {
        return request<Cart>('/cart');
    },

    addItem: async (productId: number, quantity: number = 1): Promise<Cart> => {
        return request<Cart>('/cart/items', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        });
    },

    updateItem: async (productId: number, quantity: number): Promise<Cart> => {
        return request<Cart>(`/cart/items/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ productId, quantity }),
        });
    },

    removeItem: async (productId: number): Promise<Cart> => {
        return request<Cart>(`/cart/items/${productId}`, {
            method: 'DELETE',
        });
    },

    clearCart: async (): Promise<Cart> => {
        return request<Cart>('/cart', {
            method: 'DELETE',
        });
    },
};
