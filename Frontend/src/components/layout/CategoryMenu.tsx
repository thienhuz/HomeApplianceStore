import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
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
                <div className="w-[520px] max-w-[85vw] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-100">
                    <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4">
                        <span className="material-symbols-outlined text-xl text-primary">category</span>
                        <p className="text-sm font-semibold text-slate-800">Danh mục sản phẩm</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 gap-2 p-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} height={48} borderRadius={12} />
                            ))}
                        </div>
                    ) : categories.length === 0 ? (
                        <p className="p-8 text-center text-sm text-slate-500">
                            Chưa có danh mục nào
                        </p>
                    ) : (
                        <div className="grid max-h-[60vh] grid-cols-2 gap-2 overflow-y-auto p-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.categoryId}
                                    to={`/products?categoryId=${cat.categoryId}`}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                                >
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                        <span className="material-symbols-outlined text-xl">{pickIcon(cat.categoryName)}</span>
                                    </span>
                                    <span className="flex-1 truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-primary">
                                        {cat.categoryName}
                                    </span>
                                    <span className="material-symbols-outlined -translate-x-1 text-lg text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary">
                                        chevron_right
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4 text-sm font-semibold text-primary transition-colors hover:bg-slate-100"
                    >
                        Xem tất cả sản phẩm
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryMenu;
