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
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                        Danh Mục Nổi Bật
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">
                        Chọn nhanh theo nhóm sản phẩm bạn cần
                    </p>
                </div>
                <Link
                    to="/products"
                    className="hidden sm:inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors duration-200"
                >
                    Xem tất cả
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-surface-container-lowest rounded-xl border border-surface-variant/40 animate-pulse">
                            <div className="w-16 h-16 rounded-xl bg-surface-container-high mb-4"></div>
                            <div className="h-4 bg-surface-container-high rounded w-20"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-8 text-error bg-error-container rounded-xl">{error}</div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {categories.slice(0, 5).map(cat => (
                        <Link
                            key={cat.categoryId}
                            to={`/products?categoryId=${cat.categoryId}`}
                            className="flex flex-col items-center p-6 bg-surface-container-lowest rounded-xl border border-surface-variant/40 hover:border-primary/40 hover:shadow-level-2 transition-all duration-200 ease-in-out group"
                        >
                            <div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-200">
                                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors duration-200 text-3xl">
                                    {getCategoryIcon(cat.categoryName)}
                                </span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface text-center line-clamp-1">{cat.categoryName}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-on-surface-variant">Chưa có danh mục nào.</div>
            )}
        </section>
    );
};

export default Categories;
