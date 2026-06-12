import React from 'react';

const OrderSummary: React.FC = () => {
    return (
        <div className="bg-surface-container-lowest p-gutter rounded-xl order-card-shadow space-y-stack-md">
            <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                <h3 className="font-label-md text-label-md uppercase tracking-wider">Tóm tắt đơn hàng</h3>
            </div>
            <div className="space-y-stack-sm text-body-md">
                <div className="flex justify-between">
                    <span className="text-on-surface-variant">Tạm tính (2 sản phẩm)</span>
                    <span>45.980.000₫</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-on-surface-variant">Phí vận chuyển</span>
                    <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-tertiary">
                    <span>Giảm giá khuyến mãi</span>
                    <span>-2.000.000₫</span>
                </div>
                <div className="border-t border-outline-variant my-4 pt-4 flex justify-between items-end">
                    <span className="font-bold text-headline-md">Tổng cộng</span>
                    <span className="font-bold text-headline-md text-primary">43.980.000₫</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
