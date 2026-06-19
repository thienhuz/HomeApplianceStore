import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDto } from '../../../../types';
import { useRelatedProducts } from '../../../../hooks/useRelatedProducts';
import { useCart } from '../../../../context/CartContext';

const PLACEHOLDER = 'https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image';

interface RelatedProductsProps {
  productId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const { data: products, loading } = useRelatedProducts(productId, 4);
  const { addItem } = useCart();

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Sản phẩm liên quan</h2>
        <Link className="text-primary text-sm font-medium flex items-center gap-0.5 hover:text-primary/80 transition-colors" to="/products">
          Xem tất cả <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product: ProductDto) => (
          <Link
            key={product.id}
            to={`/DetailProduct/${product.id}`}
            className="group bg-white rounded-2xl hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full border border-slate-200 hover:border-slate-300"
          >
            <div className="aspect-square p-4 bg-slate-50 relative overflow-hidden">
              <img
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                alt={product.imageAlt || product.title}
                src={product.imageUrl || PLACEHOLDER}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{product.brand}</p>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-primary font-bold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product.id, 1);
                  }}
                  className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                >
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
