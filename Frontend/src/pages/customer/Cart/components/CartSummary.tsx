import React from 'react';
import { formatVnd } from '../../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Tóm tắt đơn hàng</h3>
      <div className="space-y-4 text-sm border-b border-slate-100 pb-6 mb-6">
        <div className="flex justify-between">
          <span className="text-slate-500">Tạm tính ({selectedCount} sản phẩm)</span>
          <span className="font-semibold text-slate-900">{formatVnd(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Phí vận chuyển</span>
          {freeShipping ? (
            <span className="font-semibold text-emerald-600">Miễn phí</span>
          ) : (
            <span className="font-semibold text-slate-900">{formatVnd(shipping)}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Giảm giá</span>
          <span className="text-primary font-semibold">-0₫</span>
        </div>
        
        {/* Free shipping indicator */}
        <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          {freeShipping ? (
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-emerald-600">Đã đủ điều kiện miễn phí vận chuyển!</span>
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
            </div>
          ) : (
            <div className="text-xs mb-2 text-slate-600">
              Mua thêm <span className="font-bold text-primary">{remaining}</span> sản phẩm để được miễn phí vận chuyển
            </div>
          )}
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${freeShipping ? 'bg-emerald-500' : 'bg-primary'}`}
              style={{ width: `${Math.min(100, (selectedCount / 2) * 100)}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-6">
        <span className="text-base font-bold text-slate-900">Tổng cộng</span>
        <span className="text-2xl font-bold text-primary">{formatVnd(total)}</span>
      </div>
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => navigate('/checkout')}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? 'Chọn sản phẩm' : `Thanh toán (${selectedCount})`}
      </button>
      
      <div className="mt-6 flex items-center justify-center gap-4 text-slate-400">
        <span className="material-symbols-outlined text-[24px]">credit_card</span>
        <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
        <span className="material-symbols-outlined text-[24px]">local_shipping</span>
      </div>
    </div>
  );
};

export default CartSummary;
