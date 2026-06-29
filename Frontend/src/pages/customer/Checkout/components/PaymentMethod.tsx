import React from 'react';

interface PaymentMethodProps {
    selectedMethod: number;
    onChange: (method: number) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onChange }) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                <h2 className="text-lg font-semibold text-slate-800">Phương thức thanh toán</h2>
            </div>
            <div className="flex flex-col gap-3">
                {/* Option COD */}
                <label className="flex items-center justify-between p-4 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 1} 
                            onChange={() => onChange(1)}
                            className="text-primary focus:ring-primary h-5 w-5 cursor-pointer" 
                            name="payment_method" 
                            type="radio" 
                            value="1"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-500">local_shipping</span>
                            <span className="text-base font-medium text-slate-800">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                    </div>
                </label>
                {/* Option Bank Transfer */}
                <label className="flex items-center justify-between p-4 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 2}
                            onChange={() => onChange(2)}
                            disabled
                            className="text-primary focus:ring-primary h-5 w-5 cursor-not-allowed opacity-50" 
                            name="payment_method" 
                            type="radio" 
                            value="2"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-500">account_balance</span>
                            <span className="text-base font-medium text-slate-800">Chuyển khoản ngân hàng (Bank Transfer)</span>
                        </div>
                    </div>
                </label>
                {/* Option VNPay */}
                <label className="flex items-center justify-between p-4 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 3}
                            onChange={() => onChange(3)}
                            disabled
                            className="text-primary focus:ring-primary h-5 w-5 cursor-not-allowed opacity-50" 
                            name="payment_method" 
                            type="radio" 
                            value="3"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-500">account_balance_wallet</span>
                            <span className="text-base font-medium text-slate-800">Ví VNPay</span>
                        </div>
                    </div>
                    <div className="h-6 px-2 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-600 tracking-wider">VNPAY</div>
                </label>
                {/* Option MoMo */}
                <label className="flex items-center justify-between p-4 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-4">
                        <input 
                            checked={selectedMethod === 4}
                            onChange={() => onChange(4)}
                            disabled
                            className="text-primary focus:ring-primary h-5 w-5 cursor-not-allowed opacity-50" 
                            name="payment_method" 
                            type="radio" 
                            value="4"
                        />
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-500">wallet</span>
                            <span className="text-base font-medium text-slate-800">Ví MoMo</span>
                        </div>
                    </div>
                    <div className="h-6 px-2 bg-pink-50 rounded flex items-center justify-center text-[10px] font-bold text-pink-600 tracking-wider">MOMO</div>
                </label>
            </div>
        </section>
    );
};

export default PaymentMethod;
