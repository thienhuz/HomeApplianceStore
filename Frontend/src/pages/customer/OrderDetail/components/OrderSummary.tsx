import React from 'react';

interface OrderSummaryProps {
    totalAmount: number;
    discountAmount?: number;
    finalAmount: number;
    itemCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount, discountAmount, finalAmount, itemCount }) => {
    return (
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 space-y-4">
            {/* Section label */}
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="receipt_long">receipt_long</span>
                <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Tóm tắt đơn hàng</h3>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-[13px]">
                <div className="flex justify-between items-baseline">
                    <span className="text-on-surface-variant">Tạm tính ({itemCount} sản phẩm)</span>
                    <span className="text-on-surface font-medium tabular-nums">{totalAmount.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-on-surface-variant">Phí vận chuyển</span>
                    <span className="text-emerald-600 font-medium">Miễn phí</span>
                </div>
                {discountAmount && discountAmount > 0 && (
                    <div className="flex justify-between items-baseline">
                        <span className="text-on-surface-variant">Giảm giá</span>
                        <span className="text-red-500 font-medium tabular-nums">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                )}
            </div>

            {/* Total */}
            <div className="border-t border-outline-variant/30 pt-4 flex justify-between items-baseline">
                <span className="text-[14px] font-semibold text-on-surface">Tổng cộng</span>
                <span className="text-[18px] font-bold text-primary tabular-nums">{finalAmount.toLocaleString('vi-VN')}₫</span>
            </div>
        </div>
    );
};

export default OrderSummary;
