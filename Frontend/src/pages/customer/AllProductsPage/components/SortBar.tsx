import React from 'react';


interface SortBarProps {
    totalItems: number;
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    onSortChange: (sort: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ totalItems, pageSize, pageNumber, sortBy, onSortChange }) => {
    const startItem = totalItems === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
    const endItem = Math.min(pageNumber * pageSize, totalItems);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-gutter bg-surface-container-lowest p-stack-md rounded-lg shadow-sm">
            <span className="font-body-md text-body-md text-secondary mb-2 md:mb-0">
                Hiển thị {startItem}-{endItem} trên {totalItems} sản phẩm
            </span>
            <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md text-on-surface">Sắp xếp:</span>
                <select
                    className="bg-transparent border-none focus:ring-0 font-body-md text-body-md text-primary font-semibold cursor-pointer"
                    value={sortBy || 'newest'}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="newest">Mới nhất</option>
                    <option value="price_asc">Giá thấp đến cao</option>
                    <option value="price_desc">Giá cao đến thấp</option>
                    <option value="best_selling">Bán chạy nhất</option>
                </select>
            </div>
        </div>
    );
};

export default SortBar;
