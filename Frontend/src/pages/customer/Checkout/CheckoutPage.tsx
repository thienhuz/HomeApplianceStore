import React from 'react';
import DeliveryAddress from './components/DeliveryAddress';
import PaymentMethod from './components/PaymentMethod';
import OrderNote from './components/OrderNote';
import OrderSummary from './components/OrderSummary';

const CheckoutPage: React.FC = () => {
    return (
        <div className="bg-background text-on-surface min-h-screen">
            <main className="max-w-container-max mx-auto px-margin-desktop pt-8 pb-stack-lg">
                <h1 className="font-headline-lg text-headline-lg mb-stack-lg">Thanh toán</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    {/* Cột trái: Thông tin giao hàng & Thanh toán */}
                    <div className="lg:col-span-8 flex flex-col gap-stack-lg">
                        <DeliveryAddress />
                        <PaymentMethod />
                        <OrderNote />
                    </div>
                    {/* Cột phải: Tóm tắt đơn hàng (Sticky) */}
                    <div className="lg:col-span-4">
                        <OrderSummary />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;
