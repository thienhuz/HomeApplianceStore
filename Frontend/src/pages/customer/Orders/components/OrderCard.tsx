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
        <div className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all group ${cardExtraClass}`}>
            <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-slate-900">{orderId}</span>
                    <span className="text-slate-400 text-sm">• {date}</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusStyle}`}>{status}</span>
                </div>
                <div className="text-right">
                    <span className="text-slate-500 text-sm">Tổng thanh toán: </span>
                    <span className="text-[15px] font-semibold text-primary">{totalAmount}</span>
                </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                    <img alt={productImageAlt} className="w-full h-full object-contain mix-blend-multiply" src={productImage} />
                </div>
                <div className="flex-grow min-w-0">
                    <h3 className="text-[15px] font-semibold text-slate-900 truncate">{productTitle}</h3>
                    <p className="text-slate-500 text-sm mt-1">{productSubtitle}</p>
                </div>
                <Link className="flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/80 transition-colors flex-shrink-0" to={`/orders/${orderId.replace('#', '')}`}>
                    Xem chi tiết
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
            </div>
        </div>
    );
};

export default OrderCard;
