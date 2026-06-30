import React from 'react';

interface ShippingInfoProps {
    name: string;
    phone: string;
    address: string;
    paymentMethod: number;
    note?: string;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({ name, phone, address, paymentMethod, note }) => {
    const getPaymentMethodInfo = (method: number) => {
        switch (method) {
            case 1: return { text: 'Thanh toán khi nhận hàng (COD)', icon: 'payments' };
            case 2: return { text: 'Chuyển khoản ngân hàng', icon: 'account_balance' };
            case 3: return { text: 'Thanh toán qua VNPay', icon: 'credit_card' };
            case 4: return { text: 'Thanh toán qua Momo', icon: 'phone_iphone' };
            default: return { text: 'Khác', icon: 'credit_card' };
        }
    };

    const paymentInfo = getPaymentMethodInfo(paymentMethod);

    return (
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 space-y-4">
            {/* Section label */}
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="location_on">location_on</span>
                <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Thông tin giao hàng</h3>
            </div>

            {/* Recipient info */}
            <div className="space-y-1">
                <p className="text-[14px] font-semibold text-on-surface">{name}</p>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">{phone}</p>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">{address}</p>
            </div>

            {/* Payment method */}
            <div className="pt-4 border-t border-outline-variant/30 space-y-2">
                <p className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Phương thức thanh toán</p>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon={paymentInfo.icon}>{paymentInfo.icon}</span>
                    <p className="text-[13px] text-on-surface leading-relaxed">{paymentInfo.text}</p>
                </div>
            </div>

            {/* Note */}
            {note && (
                <div className="pt-4 border-t border-outline-variant/30 space-y-2">
                    <p className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Ghi chú</p>
                    <p className="text-[13px] text-on-surface-variant leading-relaxed italic bg-surface-container-low rounded-lg px-4 py-3">{note}</p>
                </div>
            )}
        </div>
    );
};

export default ShippingInfo;
