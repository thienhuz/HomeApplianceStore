import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

/** Chọn icon Material Symbols phù hợp theo tên danh mục (fallback: category). */
const pickIcon = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('tủ lạnh')) return 'kitchen';
    if (n.includes('giặt')) return 'local_laundry_service';
    if (n.includes('rửa')) return 'dishwasher_gen';
    if (n.includes('bếp') || n.includes('nấu')) return 'oven_gen';
    if (n.includes('lạnh') || n.includes('điều hòa')) return 'ac_unit';
    if (n.includes('quạt')) return 'mode_fan';
    if (n.includes('tivi') || n.includes('tv')) return 'tv';
    if (n.includes('nước')) return 'water_drop';
    if (n.includes('lò') || n.includes('vi sóng')) return 'microwave';
    if (n.includes('gia dụng') || n.includes('nhỏ')) return 'blender';
    return 'category';
};

const CategoryMenu: React.FC = () => {
    const { data: categories, loading } = useCategories();
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className={`inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl px-2 md:px-4 py-2 md:py-2.5 font-medium transition-colors border ${
                    open
                        ? 'bg-primary border-primary text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
            >
                <span className="material-symbols-outlined text-[24px] md:text-[20px]">menu</span>
                <span className="hidden md:inline">Danh mục</span>
                <span
                    className={`hidden md:inline material-symbols-outlined text-[18px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    expand_more
                </span>
            </button>

            {/* Dropdown mega menu */}
            <div
                className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                    open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
                }`}
            >
                <div className="w-[520px] max-w-[85vw] overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-lowest shadow-2xl">
                    <div className="flex items-center gap-2 border-b border-surface-variant/40 bg-surface-container-low px-5 py-3">
                        <span className="material-symbols-outlined text-[20px] text-primary">category</span>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">Danh mục sản phẩm</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 gap-1 p-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-container" />
                            ))}
                        </div>
                    ) : categories.length === 0 ? (
                        <p className="p-6 text-center font-body-sm text-body-sm text-on-surface-variant">
                            Chưa có danh mục nào
                        </p>
                    ) : (
                        <div className="grid max-h-[60vh] grid-cols-2 gap-1 overflow-y-auto p-3">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.categoryId}
                                    to={`/products?categoryId=${cat.categoryId}`}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                                        <span className="material-symbols-outlined text-[20px]">{pickIcon(cat.categoryName)}</span>
                                    </span>
                                    <span className="flex-1 truncate font-body-md text-body-md text-on-surface transition-colors group-hover:text-primary">
                                        {cat.categoryName}
                                    </span>
                                    <span className="material-symbols-outlined -translate-x-1 text-[18px] text-on-surface-variant opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                                        chevron_right
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-1 border-t border-surface-variant/40 px-5 py-3 font-label-md text-label-md text-primary transition-colors hover:bg-primary/5"
                    >
                        Xem tất cả sản phẩm
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryMenu;
