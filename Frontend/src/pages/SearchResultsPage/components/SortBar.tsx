import React from 'react';

const SortBar: React.FC = () => {
    return (
        <div className="flex items-center justify-between mb-stack-md pb-stack-sm border-b border-surface-variant/20">
            <div className="flex items-center gap-stack-md">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Sắp xếp theo:</span>
                <select className="bg-transparent border-none font-label-md text-label-md text-primary focus:ring-0 cursor-pointer">
                    <option>Mới nhất</option>
                    <option>Giá: Thấp đến Cao</option>
                    <option>Giá: Cao đến Thấp</option>
                    <option>Phổ biến nhất</option>
                </select>
            </div>
            <div className="flex items-center gap-stack-sm text-secondary">
                <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">grid_view</span></button>
                <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">view_list</span></button>
            </div>
        </div>
    );
};

export default SortBar;
