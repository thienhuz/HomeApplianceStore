import React from 'react';
import { useCart } from '../../../../context/CartContext';

interface OrderSummaryProps {
    onCheckout: () => void;
    isProcessing: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onCheckout, isProcessing }) => {
    const { cart } = useCart();

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
                {/* Voucher Section */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mã giảm giá</label>
                    <div className="flex gap-2">
                        <input 
                            className="flex-grow rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-primary px-4 py-3 text-sm outline-none transition-all" 
                            placeholder="Nhập mã voucher" 
                            type="text"
                        />
                        <button type="button" className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                            Áp dụng
                        </button>
                    </div>
                </div>
                {/* Pricing Details */}
                <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Tạm tính</span>
                        <span className="font-medium text-slate-800">{cart.subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Phí vận chuyển</span>
                        <span className="font-medium text-teal-600">{cart.freeShipping ? "Miễn phí" : "Chưa tính"}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Giảm giá voucher</span>
                        <span className="font-medium text-slate-800">-0₫</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-2">
                        <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                        <span className="text-xl font-bold text-primary">{cart.subtotal.toLocaleString('vi-VN')}₫</span>
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
