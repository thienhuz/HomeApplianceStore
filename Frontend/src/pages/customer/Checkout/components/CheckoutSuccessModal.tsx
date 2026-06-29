import React from 'react';
import { Link } from 'react-router-dom';

interface CheckoutSuccessModalProps {
    isOpen: boolean;
}

const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[40px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Đặt hàng thành công!</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Cảm ơn bạn đã mua sắm tại HomeApplianceStore. Đơn hàng của bạn đã được ghi nhận và đang chờ xử lý.
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 w-full mb-8 text-sm text-slate-700 space-y-2 text-left ring-1 ring-slate-100">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Phương thức:</span>
                            <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Trạng thái:</span>
                            <span className="font-semibold text-amber-600">Chờ xác nhận</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <Link 
                            to="/profile" 
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            Xem đơn hàng của tôi
                        </Link>
                        <Link 
                            to="/" 
                            className="w-full bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessModal;
