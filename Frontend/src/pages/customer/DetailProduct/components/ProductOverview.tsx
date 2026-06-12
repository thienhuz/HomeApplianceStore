import React from 'react';
import type { Product } from '../../../../types';
import QuantitySelector from './QuantitySelector';

interface ProductOverviewProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ product, quantity, onQuantityChange }) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="lg:col-span-5 flex flex-col">
      <div className="mb-2 inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full w-fit font-label-sm text-label-sm">
        {product.brand}
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm leading-tight">{product.title}</h1>
      <div className="flex items-center gap-4 mb-stack-md flex-wrap">
        <div className="flex items-center text-primary">
          {ratingStars.map((star) => (
            <span
              key={star}
              className="material-symbols-outlined"
              style={{ fontVariationSettings: star <= product.rating ? "'FILL' 1" : "'FILL' 0" }}
            >
              {star <= product.rating ? 'star' : 'star_half'}
            </span>
          ))}
          <span className="ml-2 font-body-sm text-on-surface-variant">({product.rating}/5 - {product.reviewCount} đánh giá)</span>
        </div>
        <div className="h-4 w-px bg-outline-variant" />
        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm">
          <span className="material-symbols-outlined text-sm">inventory_2</span>
          <span>{product.stock}</span>
        </div>
      </div>

      <div className="p-6 bg-surface-container-low rounded-xl mb-stack-lg">
        <div className="flex items-baseline gap-4 mb-2 flex-wrap">
          <span className="font-display-lg text-display-lg text-primary">{product.price}</span>
          <span className="font-body-md text-body-md text-on-surface-variant line-through">{product.oldPrice}</span>
          <span className="px-2 py-0.5 bg-primary-container text-on-primary-container rounded font-label-md text-label-md">{product.discountLabel}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant italic">{product.note}</p>
      </div>

      <div className="space-y-stack-lg">
        <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex-[2] bg-primary-container text-white py-4 rounded-lg font-headline-md text-headline-md hover:opacity-90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2" type="button">
            <span className="material-symbols-outlined">shopping_bag</span>
            THÊM VÀO GIỎ HÀNG
          </button>
          <button className="flex-1 border-2 border-primary text-primary py-4 rounded-lg font-headline-md text-headline-md hover:bg-primary/5 transition-all active:scale-95" type="button">
            MUA NGAY
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-stack-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md">Giao hàng nhanh</h4>
              <p className="text-[12px] text-on-surface-variant">Trong 2-4 giờ làm việc</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md">Bảo hành 2 năm</h4>
              <p className="text-[12px] text-on-surface-variant">Chính hãng Samsung</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
