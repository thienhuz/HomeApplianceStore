import React, { useState } from 'react';
import { useCategories } from '../../../../hooks/useCategories';
import { useBrands } from '../../../../hooks/useBrands';
import type { GetProductsFilters } from '../../../../types';

interface SidebarFiltersProps {
    filters: GetProductsFilters;
    onFilterChange: (filters: Partial<GetProductsFilters>) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ filters, onFilterChange }) => {
    const { data: categories, loading: categoriesLoading } = useCategories();
    const { data: brands, loading: brandsLoading } = useBrands();
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [customMinPrice, setCustomMinPrice] = useState(filters.minPrice?.toString() || '');
    const [customMaxPrice, setCustomMaxPrice] = useState(filters.maxPrice?.toString() || '');

    const handleCategoryClick = (categoryId?: number) => {
        onFilterChange({ categoryId });
    };

    const handleBrandChange = (brandId: number, checked: boolean) => {
        const currentBrandIds = filters.brandIds || [];
        const newBrandIds = checked
            ? [...currentBrandIds, brandId]
            : currentBrandIds.filter(id => id !== brandId);
        onFilterChange({ brandIds: newBrandIds });
    };

    const handlePriceRange = (min?: number, max?: number) => {
        onFilterChange({ minPrice: min, maxPrice: max });
    };

    const applyCustomPrice = () => {
        const min = customMinPrice ? parseInt(customMinPrice, 10) : undefined;
        const max = customMaxPrice ? parseInt(customMaxPrice, 10) : undefined;
        handlePriceRange(min, max);
    };

    const handleRatingFilter = (rating?: number) => {
        onFilterChange({ minRating: filters.minRating === rating ? undefined : rating });
    };

    // Get selected category name for the title
    const selectedCategory = categories.find(c => c.categoryId === filters.categoryId);
    const title = selectedCategory ? selectedCategory.categoryName : 'Tất cả sản phẩm';

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>

            {/* Category Section */}
            <div className="space-y-3 border-b border-slate-200 pb-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Danh mục</h3>
                {categoriesLoading ? (
                    <div className="space-y-2 animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-slate-100 rounded-lg w-3/4" />
                        ))}
                    </div>
                ) : (
                    <ul className="space-y-1.5">
                        <li>
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={`text-sm transition-colors ${!filters.categoryId ? 'text-primary font-medium' : 'text-slate-600 hover:text-primary'}`}
                            >
                                Tất cả sản phẩm
                            </button>
                        </li>
                        {(showAllCategories ? categories : categories.slice(0, 5)).map(cat => (
                            <li key={cat.categoryId}>
                                <button
                                    onClick={() => handleCategoryClick(cat.categoryId)}
                                    className={`text-left text-sm transition-colors ${filters.categoryId === cat.categoryId ? 'text-primary font-medium' : 'text-slate-600 hover:text-primary'}`}
                                >
                                    {cat.categoryName}
                                </button>
                            </li>
                        ))}
                        {categories.length > 5 && (
                            <li>
                                <button
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                    className="text-xs text-primary font-medium hover:text-primary/80 transition-colors mt-1 flex items-center"
                                >
                                    {showAllCategories ? 'Thu gọn' : 'Xem tất cả'}
                                    <span className="material-symbols-outlined text-[16px] ml-0.5">
                                        {showAllCategories ? 'expand_less' : 'expand_more'}
                                    </span>
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {/* Brand Filter */}
            <div className="space-y-3 border-b border-slate-200 pb-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Thương hiệu</h3>
                {brandsLoading ? (
                    <div className="space-y-2 animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-slate-100 rounded" />
                                <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {brands.map(brand => (
                            <label key={brand.brandId} className="flex items-center gap-2.5 cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-colors"
                                    type="checkbox"
                                    checked={(filters.brandIds || []).includes(brand.brandId)}
                                    onChange={(e) => handleBrandChange(brand.brandId, e.target.checked)}
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{brand.brandName}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="space-y-3 border-b border-slate-200 pb-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Khoảng giá</h3>
                <div className="space-y-2">
                    {[
                        { label: 'Dưới 2 triệu', min: undefined, max: 2000000 },
                        { label: '2 triệu - 5 triệu', min: 2000000, max: 5000000 },
                        { label: '5 triệu - 10 triệu', min: 5000000, max: 10000000 },
                        { label: 'Trên 10 triệu', min: 10000000, max: undefined },
                    ].map((range, idx) => {
                        const isActive = filters.minPrice === range.min && filters.maxPrice === range.max;
                        return (
                            <label key={idx} className="flex items-center gap-2.5 cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-colors"
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => {
                                        if (isActive) {
                                            handlePriceRange(undefined, undefined);
                                        } else {
                                            setCustomMinPrice('');
                                            setCustomMaxPrice('');
                                            handlePriceRange(range.min, range.max);
                                        }
                                    }}
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{range.label}</span>
                            </label>
                        );
                    })}

                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-400 block mb-2">Hoặc nhập khoảng giá:</span>
                        <div className="flex items-center gap-2">
                            <input
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                type="number"
                                placeholder="Từ"
                                value={customMinPrice}
                                onChange={(e) => setCustomMinPrice(e.target.value)}
                            />
                            <span className="text-slate-300">—</span>
                            <input
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                type="number"
                                placeholder="Đến"
                                value={customMaxPrice}
                                onChange={(e) => setCustomMaxPrice(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={applyCustomPrice}
                            className="w-full mt-3 py-2 bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary rounded-xl text-sm font-medium transition-colors"
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Đánh giá</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => handleRatingFilter(5)}
                        className={`flex items-center gap-2 transition-colors ${filters.minRating === 5 ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                        </div>
                        <span className="text-xs">(Từ 5 sao)</span>
                    </button>
                    <button
                        onClick={() => handleRatingFilter(4)}
                        className={`flex items-center gap-2 transition-colors ${filters.minRating === 4 ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <div className="flex">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-[18px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            <span className="material-symbols-outlined text-[18px] text-slate-300">star</span>
                        </div>
                        <span className="text-xs">(Từ 4 sao)</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilters;
