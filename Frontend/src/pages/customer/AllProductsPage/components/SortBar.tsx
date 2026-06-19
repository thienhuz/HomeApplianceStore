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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-sm text-slate-500 mb-2 sm:mb-0">
                Hiển thị {startItem}-{endItem} trên {totalItems} sản phẩm
            </span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Sắp xếp:</span>
                <select
                    className="bg-transparent border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-primary font-semibold cursor-pointer outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
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
