import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../../../hooks/useCategories';

const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('tủ lạnh')) return 'kitchen';
    if (lower.includes('máy giặt')) return 'local_laundry_service';
    if (lower.includes('bếp') || lower.includes('lò')) return 'cooking';
    if (lower.includes('điều hòa') || lower.includes('quạt')) return 'ac_unit';
    if (lower.includes('tivi')) return 'tv';
    return 'blender'; // default
};

const Categories: React.FC = () => {
    const { data: categories, loading, error } = useCategories();

    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-stack-md text-center">Danh Mục Nổi Bật</h2>
            
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-stack-md">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high mb-stack-sm"></div>
                            <div className="h-4 bg-surface-container-high rounded w-20"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-4 text-error bg-error-container rounded-lg">{error}</div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-stack-md">
                    {categories.slice(0, 5).map(cat => (
                        <Link key={cat.categoryId} className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to={`/products?categoryId=${cat.categoryId}`}>
                            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">
                                    {getCategoryIcon(cat.categoryName)}
                                </span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface text-center line-clamp-1">{cat.categoryName}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 text-on-surface-variant">Chưa có danh mục nào.</div>
            )}
        </section>
    );
};

export default Categories;
