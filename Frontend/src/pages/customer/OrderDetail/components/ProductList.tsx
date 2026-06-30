import React from 'react';
import type { OrderDetailItem } from '../../../../types/order';

interface ProductListProps {
    items: OrderDetailItem[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
            {/* Section label */}
            <div className="px-6 py-4 border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="inventory_2">inventory_2</span>
                    <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Sản phẩm ({items.length})</h3>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-surface-container-low/60">
                            <th className="px-6 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Sản phẩm</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Đơn giá</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider text-center">SL</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                        {items.map((product) => (
                            <tr key={product.productId} className="hover:bg-surface-container-low/40 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                alt={product.productName}
                                                className="w-full h-full object-cover"
                                                src={product.imageUrl || '/placeholder-image.png'}
                                            />
                                        </div>
                                        <p className="text-[13px] font-medium text-on-surface leading-snug line-clamp-2">{product.productName}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-on-surface-variant tabular-nums whitespace-nowrap">
                                    {product.unitPrice.toLocaleString('vi-VN')}₫
                                </td>
                                <td className="px-6 py-4 text-[13px] text-on-surface text-center tabular-nums">
                                    {product.quantity.toString().padStart(2, '0')}
                                </td>
                                <td className="px-6 py-4 text-[13px] font-semibold text-on-surface text-right tabular-nums whitespace-nowrap">
                                    {product.totalPrice.toLocaleString('vi-VN')}₫
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
