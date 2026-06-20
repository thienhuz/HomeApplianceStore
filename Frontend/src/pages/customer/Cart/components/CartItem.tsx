import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import type { CartItem as CartItemType } from '../../../../types';
import { formatVnd } from '../../../../context/CartContext';

const PLACEHOLDER = 'https://placehold.co/200x200/f1f5f9/94a3b8?text=No+Image';

interface CartItemProps {
  item: CartItemType;
  selected: boolean;
  onToggle: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, selected, onToggle, onQuantityChange, onRemove }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 md:gap-6 border transition-all duration-200 ${
        selected
          ? 'border-primary ring-1 ring-primary bg-primary/5'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="hidden md:block">
        <Checkbox checked={selected} onChange={() => onToggle(item.productId)} ariaLabel={`Chọn ${item.title}`} />
      </div>

      <div className="flex w-full md:w-auto items-center gap-4">
        <div className="md:hidden">
            <Checkbox checked={selected} onChange={() => onToggle(item.productId)} ariaLabel={`Chọn ${item.title}`} />
        </div>
        <Link
          to={`/DetailProduct/${item.productId}`}
          className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 block"
        >
          <img
            className="w-full h-full object-cover transition-transform hover:scale-105"
            alt={item.title}
            src={item.imageUrl || PLACEHOLDER}
          />
        </Link>
      </div>

      <div className="flex-grow w-full text-left space-y-1">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{item.brand}</span>
        <Link to={`/DetailProduct/${item.productId}`} className="block">
          <h3 className="text-base font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
        </Link>
        <div className="text-sm font-medium text-slate-500">{item.price} / sản phẩm</div>
      </div>

      <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9 bg-white">
          <button
            type="button"
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
            className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30"
            disabled={item.quantity <= 1}
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <span className="w-10 text-center font-semibold text-sm text-slate-900">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
            className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>

        <div className="text-primary font-bold text-lg min-w-[120px] text-right">
          {formatVnd(item.lineTotal)}
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg flex-shrink-0"
          aria-label="Xóa sản phẩm"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
