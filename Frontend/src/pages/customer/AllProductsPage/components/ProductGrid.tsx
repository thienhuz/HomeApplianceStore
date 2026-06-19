import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDto } from '../../../../types';
import { useCart } from '../../../../context/CartContext';

interface ProductGridProps {
    products: ProductDto[];
    loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
    const { addItem } = useCart();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200 animate-pulse">
                        <div className="aspect-square bg-slate-100" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-slate-100 rounded-lg w-16" />
                            <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                            <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                            <div className="h-10 bg-slate-100 rounded-xl w-full mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-24">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">search_off</span>
                <p className="text-lg font-medium text-slate-500">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl transition-all duration-200 group overflow-hidden border border-slate-200 flex flex-col hover:shadow-md hover:border-slate-300">
                    <Link to={`/DetailProduct/${product.id}`} className="relative aspect-square bg-slate-50 overflow-hidden block">
                        <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={product.imageAlt || product.title}
                            src={product.imageUrl || 'https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image'}
                        />
                        {product.badge && (
                            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                {product.badge}
                            </div>
                        )}
                    </Link>
                    <div className="p-4 space-y-2 flex flex-col flex-grow">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{product.brand}</span>
                        <Link to={`/DetailProduct/${product.id}`} className="block">
                            <h3 className="text-[15px] font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                        </Link>

                        {product.rating > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-xs font-medium text-slate-700">{product.rating.toFixed(1)}</span>
                                <span className="text-xs text-slate-400">({product.reviewCount})</span>
                            </div>
                        )}

                        <div className="flex items-baseline gap-2 mt-auto pt-2">
                            <span className="text-primary font-bold text-[17px]">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-slate-400 line-through text-sm">{product.originalPrice}</span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => addItem(product.id)}
                            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mt-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
