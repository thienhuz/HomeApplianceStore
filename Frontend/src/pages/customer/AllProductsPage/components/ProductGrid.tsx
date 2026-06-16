import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDto } from '../../../../types';

interface ProductGridProps {
    products: ProductDto[];
    loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl product-card-shadow overflow-hidden border border-surface-variant/10 animate-pulse">
                        <div className="aspect-square bg-surface-container-high"></div>
                        <div className="p-stack-md space-y-2">
                            <div className="h-3 bg-surface-container-high rounded w-16"></div>
                            <div className="h-5 bg-surface-container-high rounded w-3/4"></div>
                            <div className="h-5 bg-surface-container-high rounded w-1/2"></div>
                            <div className="h-10 bg-surface-container-high rounded w-full mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 text-on-surface-variant">
                <span className="material-symbols-outlined text-6xl mb-4 block">search_off</span>
                <p className="text-headline-md">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10 flex flex-col">
                    <Link to={`/DetailProduct/${product.id}`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                        <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={product.imageAlt || product.title}
                            src={product.imageUrl || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'}
                        />
                        {product.badge && (
                            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                                {product.badge}
                            </div>
                        )}
                    </Link>
                    <div className="p-stack-md space-y-2 flex flex-col flex-grow">
                        <span className="text-secondary font-label-sm text-label-sm uppercase">{product.brand}</span>
                        <Link to={`/DetailProduct/${product.id}`} className="block">
                            <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                        </Link>

                        {product.rating > 0 && (
                            <div className="flex items-center gap-1 text-primary">
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-label-sm text-on-surface">{product.rating.toFixed(1)}</span>
                                <span className="text-label-sm text-on-surface-variant">({product.reviewCount})</span>
                            </div>
                        )}

                        <div className="flex items-baseline gap-2 mt-auto pt-2">
                            <span className="text-primary font-bold text-headline-md">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-secondary line-through text-body-sm">{product.originalPrice}</span>
                            )}
                        </div>
                        <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
