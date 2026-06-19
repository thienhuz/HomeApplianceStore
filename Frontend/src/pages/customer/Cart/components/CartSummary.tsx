import React from 'react';
import { formatVnd } from '../../../../context/CartContext';

const SHIPPING_FEE = 30000;

interface CartSummaryProps {
  selectedCount: number;
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ selectedCount, subtotal }) => {
  const disabled = selectedCount === 0;
  const freeShipping = selectedCount >= 2;
  const shipping = freeShipping || selectedCount === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remaining = Math.max(0, 2 - selectedCount);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_30px_rgba(31,41,55,0.06)]">
      <h3 className="font-headline-md text-headline-md mb-6">Tóm tắt đơn hàng</h3>
      <div className="space-y-4 font-body-md text-body-md border-b border-surface-variant/20 pb-6 mb-6">
        <div className="flex justify-between">
          <span className="text-secondary">Tạm tính ({selectedCount} sản phẩm)</span>
          <span className="font-semibold text-on-surface">{formatVnd(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Phí vận chuyển</span>
          {freeShipping ? (
            <span className="text-tertiary font-medium">Miễn phí</span>
          ) : (
            <span className="font-medium text-on-surface">{formatVnd(shipping)}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Giảm giá</span>
          <span className="text-primary">-0₫</span>
        </div>
        {/* Free shipping indicator */}
        <div className="mt-2">
          {freeShipping ? (
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-tertiary font-bold">Bạn đã đủ điều kiện miễn phí vận chuyển!</span>
              <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
            </div>
          ) : (
            <div className="text-xs mb-1 text-on-surface-variant">
              Mua thêm <span className="font-bold text-primary">{remaining}</span> sản phẩm để được miễn phí vận chuyển
            </div>
          )}
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${freeShipping ? 'bg-tertiary' : 'bg-primary-fixed-dim'}`}
              style={{ width: `${Math.min(100, (selectedCount / 2) * 100)}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <span className="font-headline-md text-headline-md">Tổng cộng</span>
        <span className="font-headline-md text-headline-md text-primary">{formatVnd(total)}</span>
      </div>
      <button
        type="button"
        disabled={disabled}
        className="w-full bg-primary-container text-on-primary py-4 rounded-xl font-headline-md shadow-lg shadow-primary-container/20 hover:shadow-xl hover:shadow-primary-container/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
      >
        {disabled ? 'Chọn sản phẩm để thanh toán' : `Thanh toán (${selectedCount})`}
      </button>
      <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale">
        <span className="material-symbols-outlined">credit_card</span>
        <span className="material-symbols-outlined">account_balance_wallet</span>
        <span className="material-symbols-outlined">local_shipping</span>
      </div>
    </div>
  );
};

export default CartSummary;
