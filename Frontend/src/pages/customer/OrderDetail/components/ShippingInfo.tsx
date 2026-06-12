import React from 'react';

const ShippingInfo: React.FC = () => {
    return (
        <div className="bg-surface-container-lowest p-gutter rounded-xl order-card-shadow space-y-stack-md">
            <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
                <h3 className="font-label-md text-label-md uppercase tracking-wider">Thông tin giao hàng</h3>
            </div>
            <div className="space-y-1 text-body-md">
                <p className="font-bold">Nguyễn Văn A</p>
                <p className="text-on-surface-variant">0987 654 321</p>
                <p className="text-on-surface-variant">123 Đường Láng, Phường Láng Thượng, Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="pt-4 border-t border-outline-variant">
                <p className="font-label-md text-label-md text-primary uppercase tracking-wider mb-2">Phương thức thanh toán</p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined" data-icon="credit_card">credit_card</span>
                    <p className="text-body-md">Thẻ tín dụng (Visa ending in 4242)</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
