import React from 'react';

const SidebarFilters: React.FC = () => {
    return (
        <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm">
            <h3 className="font-label-md text-label-md text-on-surface uppercase mb-stack-md tracking-wider">Bộ lọc tìm kiếm</h3>
            <div className="mb-stack-lg">
                <span className="font-label-sm text-label-sm text-outline block mb-stack-sm">Chuyên mục</span>
                <div className="space-y-stack-sm">
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">Máy giặt cửa trước</span>
                    </label>
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">Máy giặt cửa trên</span>
                    </label>
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">Máy sấy quần áo</span>
                    </label>
                </div>
            </div>

            <div className="mb-stack-lg">
                <span className="font-label-sm text-label-sm text-outline block mb-stack-sm">Thương hiệu</span>
                <div className="space-y-stack-sm">
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">Samsung</span>
                    </label>
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">LG Electronics</span>
                    </label>
                    <label className="flex items-center gap-stack-sm cursor-pointer hover:text-primary transition-colors">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm">Electrolux</span>
                    </label>
                </div>
            </div>

            <div className="mb-stack-lg">
                <span className="font-label-sm text-label-sm text-outline block mb-stack-sm">Khoảng giá</span>
                <div className="mt-stack-sm space-y-stack-md">
                    <input className="w-full h-1 bg-surface-container-high rounded-full appearance-none accent-primary cursor-pointer" max="100" min="0" type="range" value="50" readOnly />
                    <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                        <span>0đ</span>
                        <span>50.000.000đ</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:brightness-110 transition-all active:scale-95">
                Áp dụng lọc
            </button>
        </div>
    );
};

export default SidebarFilters;
