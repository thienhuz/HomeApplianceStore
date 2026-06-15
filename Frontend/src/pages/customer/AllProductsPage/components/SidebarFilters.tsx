import React, { useState } from 'react';
import { useCategories } from '../../../../hooks/useCategories';
import { useBrands } from '../../../../hooks/useBrands';
import type { GetProductsFilters } from '../../../../services/productApi';

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
        <aside className="w-full md:w-1/4 space-y-stack-lg">
            <h1 className="font-headline-lg text-headline-lg mb-stack-md">{title}</h1>

            {/* Category Section */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Danh mục</h3>
                {categoriesLoading ? (
                    <div className="space-y-2 animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-surface-container-high rounded w-3/4"></div>
                        ))}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={`font-body-md text-body-md transition-colors ${!filters.categoryId ? 'text-primary font-medium' : 'text-on-surface hover:text-primary'}`}
                            >
                                Tất cả sản phẩm
                            </button>
                        </li>
                        {(showAllCategories ? categories : categories.slice(0, 5)).map(cat => (
                            <li key={cat.categoryId}>
                                <button
                                    onClick={() => handleCategoryClick(cat.categoryId)}
                                    className={`text-left font-body-md text-body-md transition-colors ${filters.categoryId === cat.categoryId ? 'text-primary font-medium' : 'text-on-surface hover:text-primary'}`}
                                >
                                    {cat.categoryName}
                                </button>
                            </li>
                        ))}
                        {categories.length > 5 && (
                            <li>
                                <button
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                    className="font-body-sm text-body-sm text-primary hover:underline mt-2 flex items-center"
                                >
                                    {showAllCategories ? 'Thu gọn' : 'Xem tất cả'}
                                    <span className="material-symbols-outlined text-[16px] ml-1">
                                        {showAllCategories ? 'expand_less' : 'expand_more'}
                                    </span>
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {/* Brand Filter */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Thương hiệu</h3>
                {brandsLoading ? (
                    <div className="space-y-2 animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-surface-container-high rounded"></div>
                                <div className="h-4 bg-surface-container-high rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {brands.map(brand => (
                            <label key={brand.brandId} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox"
                                    type="checkbox"
                                    checked={(filters.brandIds || []).includes(brand.brandId)}
                                    onChange={(e) => handleBrandChange(brand.brandId, e.target.checked)}
                                />
                                <span className="font-body-md text-body-md group-hover:text-primary transition-colors">{brand.brandName}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Khoảng giá</h3>
                <div className="space-y-2">
                    {[
                        { label: 'Dưới 2 triệu', min: undefined, max: 2000000 },
                        { label: '2 triệu - 5 triệu', min: 2000000, max: 5000000 },
                        { label: '5 triệu - 10 triệu', min: 5000000, max: 10000000 },
                        { label: 'Trên 10 triệu', min: 10000000, max: undefined },
                    ].map((range, idx) => {
                        const isActive = filters.minPrice === range.min && filters.maxPrice === range.max;
                        return (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox"
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
                                <span className="font-body-md text-body-md group-hover:text-primary transition-colors">{range.label}</span>
                            </label>
                        );
                    })}

                    <div className="mt-4 pt-4 border-t border-surface-container-highest">
                        <span className="font-body-sm text-body-sm text-on-surface-variant block mb-2">Hoặc nhập khoảng giá:</span>
                        <div className="flex justify-between items-center gap-2">
                            <input
                                className="w-full bg-surface-container-low border border-outline-variant rounded p-2 text-label-sm"
                                type="number"
                                placeholder="Từ"
                                value={customMinPrice}
                                onChange={(e) => setCustomMinPrice(e.target.value)}
                            />
                            <span>—</span>
                            <input
                                className="w-full bg-surface-container-low border border-outline-variant rounded p-2 text-label-sm"
                                type="number"
                                placeholder="Đến"
                                value={customMaxPrice}
                                onChange={(e) => setCustomMaxPrice(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={applyCustomPrice}
                            className="w-full mt-3 py-2 bg-surface-container border border-outline hover:border-primary text-on-surface hover:text-primary rounded text-label-sm transition-colors font-semibold"
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-stack-md">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Đánh giá</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => handleRatingFilter(5)}
                        className={`flex items-center gap-2 transition-colors ${filters.minRating === 5 ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                    >
                        <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                        </div>
                        <span className="font-body-sm text-body-sm">(Từ 5 sao)</span>
                    </button>
                    <button
                        onClick={() => handleRatingFilter(4)}
                        className={`flex items-center gap-2 transition-colors ${filters.minRating === 4 ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                    >
                        <div className="flex text-primary">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            <span className="material-symbols-outlined text-[18px]">star</span>
                        </div>
                        <span className="font-body-sm text-body-sm">(Từ 4 sao)</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilters;
