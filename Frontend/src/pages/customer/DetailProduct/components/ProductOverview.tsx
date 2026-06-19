import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../../types';
import { useCart } from '../../../../context/CartContext';
import QuantitySelector from './QuantitySelector';

interface ProductOverviewProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ product, quantity, onQuantityChange }) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => index + 1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    await addItem(Number(product.id), quantity);
    navigate('/cart');
  };

  const handleBuyNow = async () => {
    await addItem(Number(product.id), quantity);
    navigate('/cart');
  };

  return (
    <div className="lg:col-span-5 flex flex-col">
      <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-lg w-fit text-xs font-semibold mb-3">
        {product.brand}
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{product.title}</h1>
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center">
          {ratingStars.map((star) => (
            <span
              key={star}
              className="material-symbols-outlined text-amber-400 text-[20px]"
              style={{ fontVariationSettings: star <= product.rating ? "'FILL' 1" : "'FILL' 0" }}
            >
              {star <= product.rating ? 'star' : 'star'}
            </span>
          ))}
          <span className="ml-2 text-sm text-slate-500">({product.rating}/5 - {product.reviewCount} đánh giá)</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>{product.stock}</span>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
        <div className="flex items-baseline gap-4 mb-2 flex-wrap">
          <span className="text-3xl font-bold text-primary">{product.price}</span>
          {product.oldPrice && (
            <span className="text-base text-slate-400 line-through">{product.oldPrice}</span>
          )}
          {product.discountLabel && (
            <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200/60 rounded-lg text-xs font-bold">{product.discountLabel}</span>
          )}
        </div>
        {product.note && <p className="text-sm text-slate-500 italic">{product.note}</p>}
      </div>

      <div className="space-y-6">
        <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleAddToCart} className="flex-[2] bg-primary text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2" type="button">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            THÊM VÀO GIỎ HÀNG
          </button>
          <button onClick={handleBuyNow} className="flex-1 border-2 border-primary text-primary py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/5 transition-colors" type="button">
            MUA NGAY
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-900">Giao hàng nhanh</h4>
              <p className="text-xs text-slate-500">Trong 2-4 giờ làm việc</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-900">Bảo hành 2 năm</h4>
              <p className="text-xs text-slate-500">Chính hãng {product.brand}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
