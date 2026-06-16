import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '../../../../hooks/useFeaturedProducts';

const FeaturedProducts: React.FC = () => {
    const { data: products, loading, error } = useFeaturedProducts(4);

    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <div className="flex justify-between items-end mb-stack-md">
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg">Sản Phẩm Nổi Bật</h2>
                <Link className="font-label-md text-label-md text-primary hover:underline" to="/products">Xem tất cả</Link>
            </div>
            
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col h-72 animate-pulse">
                            <div className="aspect-square bg-surface-container-high rounded-md mb-stack-sm w-full"></div>
                            <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2"></div>
                            <div className="mt-auto h-4 bg-surface-container-high rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-10 text-error bg-error-container rounded-lg">{error}</div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
                    {products.map(product => (
                        <Link key={product.id} to={`/DetailProduct/${product.id}`} className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col hover-lift relative group overflow-hidden">
                            {product.badge && (
                                <div className="absolute top-4 left-4 bg-error text-on-error font-label-sm text-label-sm px-2 py-1 rounded z-10">{product.badge}</div>
                            )}
                            <div className="aspect-square bg-surface-container-lowest rounded-md mb-stack-sm overflow-hidden flex items-center justify-center relative">
                                <img 
                                    className="object-contain h-full w-full" 
                                    alt={product.imageAlt || product.title}
                                    src={product.imageUrl || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'}
                                />
                                <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        className="bg-surface-container-lowest text-primary p-2 rounded-full shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors mx-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Handle add to cart
                                        }}
                                    >
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-body-lg text-body-lg text-on-surface mb-1 line-clamp-2">{product.title}</h3>
                                <div className="mt-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="font-label-md text-label-md text-primary">{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="font-body-sm text-body-sm text-on-secondary-container line-through">{product.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-on-surface-variant">Không có sản phẩm nổi bật.</div>
            )}
        </section>
    );
};

export default FeaturedProducts;
