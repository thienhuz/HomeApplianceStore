import React from 'react';
import { Link } from 'react-router-dom';

const SidebarFilters: React.FC = () => {
    return (
        <aside className="w-full md:w-1/4 space-y-stack-lg">
            <h1 className="font-headline-lg text-headline-lg mb-stack-md">Tủ Lạnh</h1>
            {/* Category Section */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Danh mục</h3>
                <ul className="space-y-2">
                    <li><Link className="font-body-md text-body-md text-primary font-medium" to="#">Tất cả tủ lạnh</Link></li>
                    <li><Link className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors" to="#">Tủ lạnh Side by Side</Link></li>
                    <li><Link className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors" to="#">Tủ lạnh Multi Door</Link></li>
                    <li><Link className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors" to="#">Tủ lạnh Ngăn đá trên</Link></li>
                    <li><Link className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors" to="#">Tủ lạnh Ngăn đá dưới</Link></li>
                </ul>
            </div>
            {/* Brand Filter */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Thương hiệu</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Samsung</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">LG</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Panasonic</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Toshiba</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Sharp</span>
                    </label>
                </div>
            </div>
            {/* Price Filter */}
            <div className="space-y-stack-md border-b border-surface-container-highest pb-stack-lg">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Khoảng giá</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Dưới 2 triệu</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">2 triệu - 5 triệu</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">5 triệu - 10 triệu</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary filter-checkbox" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Trên 10 triệu</span>
                    </label>
                </div>
            </div>
            {/* Rating Filter */}
            <div className="space-y-stack-md">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary">Đánh giá</h3>
                <div className="space-y-2">
                    <button className="flex items-center gap-2 hover:text-primary transition-colors text-secondary">
                        <div className="flex text-primary">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                        <span className="font-body-sm text-body-sm">(Từ 5 sao)</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors text-secondary">
                        <div className="flex text-primary">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
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
