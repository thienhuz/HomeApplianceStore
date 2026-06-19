import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import type { CartItem as CartItemType } from '../../../../types';
import { formatVnd } from '../../../../context/CartContext';

const PLACEHOLDER = 'https://placehold.co/200x200/e2e8f0/64748b?text=No+Image';

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
      className={`bg-surface-container-lowest rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-all ${
        selected
          ? 'ring-2 ring-primary shadow-[0_8px_24px_rgba(171,53,0,0.08)]'
          : 'shadow-[0_4px_20px_rgba(31,41,55,0.04)] hover:shadow-[0_12px_30px_rgba(31,41,55,0.08)]'
      }`}
    >
      <Checkbox checked={selected} onChange={() => onToggle(item.productId)} ariaLabel={`Chọn ${item.title}`} />

      <Link
        to={`/DetailProduct/${item.productId}`}
        className="w-28 h-28 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden"
      >
        <img
          className="w-full h-full object-cover transition-transform hover:scale-105"
          alt={item.title}
          src={item.imageUrl || PLACEHOLDER}
        />
      </Link>

      <div className="flex-grow text-center md:text-left">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">{item.brand}</span>
        <Link to={`/DetailProduct/${item.productId}`} className="block">
          <h3 className="font-headline-md text-headline-md mt-1 mb-1 hover:text-primary transition-colors">{item.title}</h3>
        </Link>
        <div className="font-body-sm text-body-sm text-secondary">{item.price} / sản phẩm</div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center border border-outline-variant rounded-full px-2 py-1">
          <button
            type="button"
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors disabled:opacity-40"
            disabled={item.quantity <= 1}
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <span className="w-10 text-center font-bold">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <div className="text-primary font-bold text-lg min-w-[130px] text-right">
          {formatVnd(item.lineTotal)}
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          className="p-2 text-secondary hover:text-error transition-colors rounded-full hover:bg-error-container/20"
          aria-label="Xóa sản phẩm"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
