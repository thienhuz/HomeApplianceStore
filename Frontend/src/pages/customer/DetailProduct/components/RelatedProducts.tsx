import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDto } from '../../../../types';
import { useRelatedProducts } from '../../../../hooks/useRelatedProducts';

const PLACEHOLDER = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';

interface RelatedProductsProps {
  productId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const { data: products, loading } = useRelatedProducts(productId, 4);

  if (loading) {
    return (
      <section className="mt-24">
        <h2 className="font-headline-lg text-headline-lg mb-8">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-xl bg-surface-container animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline-lg text-headline-lg">Sản phẩm liên quan</h2>
        <Link className="text-primary font-label-md flex items-center hover:underline" to="/products">
          Xem tất cả <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {products.map((product: ProductDto) => (
          <Link
            key={product.id}
            to={`/DetailProduct/${product.id}`}
            className="group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="aspect-square p-4 bg-surface-container-low relative overflow-hidden">
              <img
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                alt={product.imageAlt || product.title}
                src={product.imageUrl || PLACEHOLDER}
              />
              {product.badge && (
                <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-[12px] font-bold">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-on-surface-variant text-[12px] font-medium mb-1">{product.brand}</p>
              <h3 className="font-body-md font-semibold text-on-surface mb-2 line-clamp-2">{product.title}</h3>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-primary font-bold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[12px] text-on-surface-variant line-through">{product.originalPrice}</span>
                  )}
                </div>
                <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
