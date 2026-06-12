import React from 'react';

const SortBar: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-gutter bg-surface-container-lowest p-stack-md rounded-lg shadow-sm">
            <span className="font-body-md text-body-md text-secondary mb-2 md:mb-0">Hiển thị 12 trên 48 sản phẩm</span>
            <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md text-on-surface">Sắp xếp:</span>
                <select className="bg-transparent border-none focus:ring-0 font-body-md text-body-md text-primary font-semibold cursor-pointer">
                    <option>Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Bán chạy nhất</option>
                </select>
            </div>
        </div>
    );
};

export default SortBar;
