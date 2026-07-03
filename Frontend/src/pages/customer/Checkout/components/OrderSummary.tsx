import React from 'react';
import { useCart } from '../../../../context/CartContext';
import VoucherPicker from './VoucherPicker';
import type { VoucherDto } from '../../../../types';

interface OrderSummaryProps {
    onCheckout: () => void;
    isProcessing: boolean;
    selectedVoucher: VoucherDto | null;
    onVoucherChange: (voucher: VoucherDto | null) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onCheckout, isProcessing, selectedVoucher, onVoucherChange }) => {
    const { cart } = useCart();
    
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const SHIPPING_FEE = 30000;
    const freeShipping = totalQuantity >= 2;
    const shippingAmount = freeShipping || totalQuantity === 0 ? 0 : SHIPPING_FEE;

    // Tính giảm giá voucher
    const computeDiscount = (): number => {
        if (!selectedVoucher) return 0;
        if (selectedVoucher.discountType === 'percent') {
            const raw = cart.subtotal * selectedVoucher.discountAmount / 100;
            return selectedVoucher.maxDiscount ? Math.min(raw, selectedVoucher.maxDiscount) : raw;
        }
        return selectedVoucher.discountAmount;
    };

    const discountAmount = computeDiscount();
    const finalTotal = Math.max(0, cart.subtotal + shippingAmount - discountAmount);

    return (
        <div className="sticky top-8 flex flex-col gap-6">
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm ring-1 ring-slate-100">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Tóm tắt đơn hàng</h2>

                {/* Product List */}
                <div className="flex flex-col gap-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.items.map(item => (
                        <div key={item.productId} className="flex gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0 ring-1 ring-slate-100">
                                <img 
                                    className="w-full h-full object-cover mix-blend-multiply" 
                                    alt={item.title} 
                                    src={item.imageUrl || '/placeholder.png'}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="text-base font-semibold text-slate-800 line-clamp-1 mb-1">{item.title}</p>
                                <p className="text-sm text-slate-500 mb-1">SL: {item.quantity}</p>
                                <p className="text-sm font-bold text-primary">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Voucher Picker */}
                <div className="mb-8">
                    <VoucherPicker
                        subtotal={cart.subtotal}
                        selectedVoucher={selectedVoucher}
                        onSelect={onVoucherChange}
                    />
                </div>

                {/* Pricing Details */}
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Tạm tính</span>
                        <span className="font-medium text-slate-800">{cart.subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Phí vận chuyển</span>
                        {freeShipping ? (
                            <span className="font-medium text-teal-600">Miễn phí</span>
                        ) : (
                            <span className="font-medium text-slate-800">{shippingAmount.toLocaleString('vi-VN')}₫</span>
                        )}
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Giảm giá voucher</span>
                        <span className={`font-medium ${discountAmount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                            {discountAmount > 0 ? `-${discountAmount.toLocaleString('vi-VN')}₫` : '0₫'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-1">
                        <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                        <span className="text-xl font-bold text-primary">{finalTotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>

                {/* Checkout Button */}
                <button 
                    type="button"
                    onClick={onCheckout}
                    disabled={isProcessing || cart.items.length === 0}
                    className="w-full mt-8 bg-primary text-white py-4 rounded-xl text-base font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isProcessing ? "Đang xử lý..." : "Đặt hàng ngay"}
                </button>
                <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
                    Bằng cách nhấn Đặt hàng, bạn đồng ý với các <a className="text-primary hover:underline font-medium" href="#">Điều khoản &amp; Điều kiện</a> của chúng tôi.
                </p>
            </section>
        </div>
    );
};

export default OrderSummary;
