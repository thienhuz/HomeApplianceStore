import React from 'react';
import { Link } from 'react-router-dom';

interface OrderCardProps {
    orderId: string;
    date: string;
    status: string;
    statusStyle: string;
    finalAmount: string;
    productImage: string;
    productImageAlt: string;
    productTitle: string;
    productSubtitle: string;
    cardExtraClass?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
    orderId,
    date,
    status,
    statusStyle,
    finalAmount,
    productImage,
    productImageAlt,
    productTitle,
    productSubtitle,
    cardExtraClass = '',
}) => {
    return (
        <div className={`bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 transition-colors duration-200 ${cardExtraClass}`}>
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[13px] font-semibold text-on-surface tabular-nums">{orderId}</span>
                    <span className="text-on-surface-variant/50 text-[13px]">•</span>
                    <span className="text-on-surface-variant text-[13px]">{date}</span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium leading-relaxed ${statusStyle}`}>{status}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-on-surface-variant text-[12px]">Thanh toán:</span>
                    <span className="text-[14px] font-semibold text-primary tabular-nums">{finalAmount}</span>
                </div>
            </div>

            {/* Product row */}
            <div className="flex items-center gap-4 pt-4">
                <div className="w-16 h-16 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center p-1.5">
                    <img alt={productImageAlt} className="w-full h-full object-contain mix-blend-multiply" src={productImage} />
                </div>
                <div className="flex-grow min-w-0">
                    <h3 className="text-[13px] font-medium text-on-surface truncate leading-snug">{productTitle}</h3>
                    <p className="text-on-surface-variant text-[12px] mt-1 leading-relaxed">{productSubtitle}</p>
                </div>
                <Link
                    className="flex items-center gap-0.5 text-primary text-[13px] font-medium hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
                    to={`/orders/${orderId.replace('#', '')}`}
                >
                    Chi tiết
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
            </div>
        </div>
    );
};

export default OrderCard;
