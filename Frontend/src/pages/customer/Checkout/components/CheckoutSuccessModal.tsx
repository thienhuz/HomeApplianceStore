import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckoutSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleGoToOrders = () => {
        onClose();
        navigate('/orders');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="p-8 text-center flex flex-col items-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5 ring-8 ring-emerald-50/60">
                        <span
                            className="material-symbols-outlined text-[44px] text-emerald-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            check_circle
                        </span>
                    </div>

                    {/* Text */}
                    <h2 className="text-[22px] font-bold text-slate-900 mb-2 tracking-tight">Đặt hàng thành công!</h2>
                    <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
                        Cảm ơn bạn đã mua sắm tại <span className="font-medium text-slate-700">HomeApplianceStore</span>.
                        Đơn hàng của bạn đã được ghi nhận và đang chờ xử lý.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 w-full">
                        <button
                            type="button"
                            onClick={handleGoToOrders}
                            className="w-full bg-primary text-white py-3.5 rounded-xl text-[15px] font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                        >
                            Xem đơn hàng của tôi
                        </button>
                        <button
                            type="button"
                            onClick={() => { onClose(); navigate('/'); }}
                            className="w-full bg-slate-100 text-slate-700 py-3.5 rounded-xl text-[15px] font-medium hover:bg-slate-200 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessModal;
