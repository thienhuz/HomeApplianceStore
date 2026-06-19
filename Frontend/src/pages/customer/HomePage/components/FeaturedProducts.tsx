import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '../../../../hooks/useFeaturedProducts';
import { useCart } from '../../../../context/CartContext';

const FeaturedProducts: React.FC = () => {
    const { data: products, loading, error } = useFeaturedProducts(4);
    const { addItem } = useCart();

    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                        Sản Phẩm Nổi Bật
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">
                        Những thiết bị được yêu thích nhất tháng này
                    </p>
                </div>
                <Link
                    className="hidden sm:inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors duration-200"
                    to="/products"
                >
                    Xem tất cả
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-surface-container-lowest rounded-xl border border-surface-variant/40 p-4 flex flex-col h-72 animate-pulse">
                            <div className="aspect-square bg-surface-container-high rounded-lg mb-4 w-full"></div>
                            <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2"></div>
                            <div className="mt-auto h-4 bg-surface-container-high rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-8 text-error bg-error-container rounded-xl">{error}</div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map(product => (
                        <Link
                            key={product.id}
                            to={`/DetailProduct/${product.id}`}
                            className="bg-surface-container-lowest rounded-xl border border-surface-variant/40 p-4 flex flex-col relative group overflow-hidden hover:border-primary/40 hover:shadow-level-2 transition-all duration-200 ease-in-out"
                        >
                            {product.badge && (
                                <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-md z-10">
                                    {product.badge}
                                </div>
                            )}
                            <div className="aspect-square bg-surface-container-low rounded-lg mb-4 overflow-hidden flex items-center justify-center relative">
                                <img
                                    className="object-contain h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    alt={product.imageAlt || product.title}
                                    src={product.imageUrl || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'}
                                />
                                <button
                                    className="absolute bottom-3 right-3 bg-surface-container-lowest text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-level-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-on-primary transition-all duration-200 ease-in-out"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem(product.id);
                                    }}
                                    aria-label="Thêm vào giỏ hàng"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">{product.brand}</span>
                                <h3 className="font-body-md text-body-md font-medium text-on-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                                    {product.title}
                                </h3>
                                <div className="mt-auto pt-4 flex items-baseline gap-2">
                                    <span className="font-headline-md text-headline-md text-primary">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">{product.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-on-surface-variant">Không có sản phẩm nổi bật.</div>
            )}
        </section>
    );
};

export default FeaturedProducts;
