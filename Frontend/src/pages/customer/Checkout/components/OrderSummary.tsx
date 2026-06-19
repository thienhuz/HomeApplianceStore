import React, { useState } from 'react';

const OrderSummary: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            alert("Đơn hàng của bạn đã được tiếp nhận thành công!");
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="sticky-sidebar flex flex-col gap-stack-md">
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl checkout-shadow">
                <h2 className="font-headline-md text-headline-md mb-stack-md">Tóm tắt đơn hàng</h2>
                {/* Product List */}
                <div className="flex flex-col gap-stack-md mb-stack-lg">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 rounded bg-surface-container-low overflow-hidden flex-shrink-0">
                            <img 
                                className="w-full h-full object-cover" 
                                alt="High-end modern professional refrigerator appliance" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAav9pCam0yyqD6J9vVNjItFSjD2udzPZJAc0Cx-_9MkPFbn7Fy9QZ8X3sNuAwMRrRRgW3mgwvzoPNNxx3l1WVweZWvHNGrX9Yuqfu7pgG0vmuNvpSninK5fF-iK8qW8sjXtzwk35Mpdp_5Q34xEwvU1RmHuIkDfnWRw_beCew3zksm-XwZFhj7k5y_OLvtlhJzdaoFzf40CoYtWXnE8Rr95-RnXgjt0tSmubCbbNzDO1xtzMuZs7HKjSmef78qbq2tumTG98LlAw"
                            />
                        </div>
                        <div className="flex-grow">
                            <p className="font-body-md font-semibold line-clamp-1">Tủ lạnh Inverter Multi Door</p>
                            <p className="text-body-sm text-secondary">SL: 1</p>
                            <p className="text-body-sm font-bold text-primary">12.490.000₫</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-16 h-16 rounded bg-surface-container-low overflow-hidden flex-shrink-0">
                            <img 
                                className="w-full h-full object-cover" 
                                alt="Modern high-efficiency induction cooktop" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKbUvP9QiMyGsKxtjk0aIw5_DN5AVS-i9FSdtpQ_uax6qfA74Svj3iynRkF4gLYOeeGzG3XEoIxanu1sbwOym1-Co8-P6-8GcFMqNb44RI-oVijvIUYz78rHL-XV5YHkwyzMf6bX_TmUA-zZ8YyUN3PQZNjWIY4lzqul1LvnQ243Av8ZEAC9weRf-w7tK4crKQ74ImUQlGvB3AyaOKCn93bx5J94vTDdTwkp9vWYf7ERi8psKtjD-VK_jTf2IQ8bg2AN99cKm54A"
                            />
                        </div>
                        <div className="flex-grow">
                            <p className="font-body-md font-semibold line-clamp-1">Bếp từ cảm ứng thông minh</p>
                            <p className="text-body-sm text-secondary">SL: 1</p>
                            <p className="text-body-sm font-bold text-primary">3.200.000₫</p>
                        </div>
                    </div>
                </div>
                {/* Voucher Section */}
                <div className="mb-stack-lg">
                    <label className="block font-label-md text-label-md mb-2">Mã giảm giá</label>
                    <div className="flex gap-2">
                        <input 
                            className="flex-grow rounded-lg border-outline-variant focus:border-primary focus:ring-primary px-3 py-2 font-body-sm" 
                            placeholder="Nhập mã voucher" 
                            type="text"
                        />
                        <button type="button" className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md hover:bg-secondary-fixed transition-colors">
                            Áp dụng
                        </button>
                    </div>
                </div>
                {/* Pricing Details */}
                <div className="flex flex-col gap-3 border-t border-surface-variant pt-stack-md">
                    <div className="flex justify-between font-body-sm text-secondary">
                        <span>Tạm tính</span>
                        <span>15.690.000₫</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-secondary">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-secondary">
                        <span>Giảm giá voucher</span>
                        <span>-0₫</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-surface-variant pt-stack-sm mt-stack-sm">
                        <span className="font-headline-md text-headline-md">Tổng cộng</span>
                        <span className="font-headline-md text-headline-md text-primary">15.690.000₫</span>
                    </div>
                </div>
                {/* Checkout Button */}
                <button 
                    type="button"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full mt-stack-lg bg-primary-container text-on-primary py-4 rounded-xl font-headline-md font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isProcessing ? "Đang xử lý..." : "Đặt hàng ngay"}
                </button>
                <p className="text-center text-[11px] text-secondary mt-stack-md">
                    Bằng cách nhấn Đặt hàng, bạn đồng ý với các <a className="underline" href="#">Điều khoản &amp; Điều kiện</a> của chúng tôi.
                </p>
            </section>
        </div>
    );
};

export default OrderSummary;
