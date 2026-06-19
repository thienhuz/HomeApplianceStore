import React, { useState } from 'react';

const PaymentMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState('cod');

    return (
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl checkout-shadow">
            <div className="flex items-center gap-2 mb-stack-md">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="font-headline-md text-headline-md">Phương thức thanh toán</h2>
            </div>
            <div className="flex flex-col gap-3">
                {/* Option COD */}
                <label className="flex items-center justify-between p-stack-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 'cod'} 
                            onChange={() => setSelectedMethod('cod')}
                            className="text-primary focus:ring-primary h-5 w-5 cursor-pointer" 
                            name="payment_method" 
                            type="radio" 
                            value="cod"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary">local_shipping</span>
                            <span className="font-body-md">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                    </div>
                </label>
                {/* Option Bank Transfer */}
                <label className="flex items-center justify-between p-stack-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 'bank'}
                            onChange={() => setSelectedMethod('bank')}
                            className="text-primary focus:ring-primary h-5 w-5 cursor-pointer" 
                            name="payment_method" 
                            type="radio" 
                            value="bank"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary">account_balance</span>
                            <span className="font-body-md">Chuyển khoản ngân hàng (Bank Transfer)</span>
                        </div>
                    </div>
                </label>
                {/* Option VNPay */}
                <label className="flex items-center justify-between p-stack-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 'vnpay'}
                            onChange={() => setSelectedMethod('vnpay')}
                            className="text-primary focus:ring-primary h-5 w-5 cursor-pointer" 
                            name="payment_method" 
                            type="radio" 
                            value="vnpay"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
                            <span className="font-body-md">Ví VNPay</span>
                        </div>
                    </div>
                    <div className="h-6 w-12 bg-surface-container-high rounded flex items-center justify-center text-[10px] font-bold text-secondary">VNPAY</div>
                </label>
                {/* Option MoMo */}
                <label className="flex items-center justify-between p-stack-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 'momo'}
                            onChange={() => setSelectedMethod('momo')}
                            className="text-primary focus:ring-primary h-5 w-5 cursor-pointer" 
                            name="payment_method" 
                            type="radio" 
                            value="momo"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary">wallet</span>
                            <span className="font-body-md">Ví MoMo</span>
                        </div>
                    </div>
                    <div className="h-6 w-12 bg-pink-100 rounded flex items-center justify-center text-[10px] font-bold text-pink-600">MOMO</div>
                </label>
            </div>
        </section>
    );
};

export default PaymentMethod;
