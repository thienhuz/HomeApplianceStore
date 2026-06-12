import React from 'react';
import { Link } from 'react-router-dom';

interface OrderCardProps {
    orderId: string;
    date: string;
    status: string;
    statusStyle: string;
    totalAmount: string;
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
    totalAmount,
    productImage,
    productImageAlt,
    productTitle,
    productSubtitle,
    cardExtraClass = '',
}) => {
    return (
        <div className={`bg-surface-container-lowest rounded-xl p-stack-md border border-surface-container-highest order-card-shadow transition-all group ${cardExtraClass}`}>
            <div className="flex flex-col md:flex-row justify-between gap-stack-md pb-stack-md border-b border-surface-container">
                <div className="flex items-center gap-stack-md">
                    <span className="font-label-md text-label-md text-on-surface">{orderId}</span>
                    <span className="text-on-surface-variant text-body-sm">• {date}</span>
                    <span className={`px-3 py-1 rounded-full text-label-sm ${statusStyle}`}>{status}</span>
                </div>
                <div className="text-right">
                    <span className="text-on-surface-variant text-body-sm">Tổng thanh toán: </span>
                    <span className="font-headline-md text-headline-md text-primary">{totalAmount}</span>
                </div>
            </div>
            <div className="flex items-center gap-gutter py-stack-md">
                <div className="w-20 h-20 bg-surface-container-low rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                    <img alt={productImageAlt} className="w-full h-full object-contain" src={productImage} />
                </div>
                <div className="flex-grow">
                    <h3 className="font-body-lg text-body-lg font-semibold text-on-surface truncate max-w-md">{productTitle}</h3>
                    <p className="text-on-surface-variant text-body-sm mt-1">{productSubtitle}</p>
                </div>
                <Link className="flex items-center gap-1 text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform" to={`/orders/${orderId.replace('#', '')}`}>
                    Xem chi tiết
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
            </div>
        </div>
    );
};

export default OrderCard;
