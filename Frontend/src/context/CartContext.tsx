import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cart } from '../types';
import { cartApi } from '../services/cartApi';
import { useAuth } from './AuthContext';

const EMPTY_CART: Cart = {
  items: [],
  totalQuantity: 0,
  distinctCount: 0,
  subtotal: 0,
  freeShipping: false,
};

interface CartContextValue {
  cart: Cart;
  loading: boolean;
  totalQuantity: number;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/** Định dạng số tiền VND: 45990000 -> "45.990.000₫". */
export const formatVnd = (amount: number): string => `${amount.toLocaleString('vi-VN')}₫`;

/** Chuyển chuỗi giá ("12.490.000₫") về số (12490000). */
export const parsePrice = (price: string): number => Number(price.replace(/[^\d]/g, '')) || 0;

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(EMPTY_CART);
      return;
    }
    setLoading(true);
    try {
      const result = await cartApi.getCart();
      setCart(result);
    } catch {
      setCart(EMPTY_CART);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Tải lại giỏ hàng khi đăng nhập / đăng xuất.
  useEffect(() => {
    refresh();
  }, [refresh]);

  const requireAuth = (): boolean => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const addItem = async (productId: number, quantity: number = 1) => {
    if (!requireAuth()) return;
    setCart(await cartApi.addItem(productId, quantity));
  };

  const updateItem = async (productId: number, quantity: number) => {
    if (!requireAuth()) return;
    setCart(await cartApi.updateItem(productId, quantity));
  };

  const removeItem = async (productId: number) => {
    if (!requireAuth()) return;
    setCart(await cartApi.removeItem(productId));
  };

  const clearCart = async () => {
    if (!requireAuth()) return;
    setCart(await cartApi.clearCart());
  };

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      totalQuantity: cart.totalQuantity,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      refresh,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải được dùng bên trong CartProvider');
  return ctx;
};
