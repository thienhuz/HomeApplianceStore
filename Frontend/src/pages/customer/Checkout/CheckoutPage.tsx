import React, { useState, useEffect } from 'react';
import DeliveryAddress from './components/DeliveryAddress';
import PaymentMethod from './components/PaymentMethod';
import OrderNote from './components/OrderNote';
import OrderSummary from './components/OrderSummary';
import { getMyAddresses } from '../../../services/addressService';
import { orderApi } from '../../../services/orderApi';
import type { UserAddress } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart, refresh } = useCart();
    
    const [addresses, setAddresses] = useState<UserAddress[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<number>(1); // 1 = COD
    const [note, setNote] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        getMyAddresses().then(data => {
            setAddresses(data);
            const defaultAddr = data.find(a => a.isDefault);
            if (defaultAddr) {
                setSelectedAddressId(defaultAddr.addressId);
            } else if (data.length > 0) {
                setSelectedAddressId(data[0].addressId);
            }
        }).catch(err => {
            console.error("Failed to load addresses", err);
        });
    }, []);

    const handleCheckout = async () => {
        if (cart.items.length === 0) {
            toast.warning('Giỏ hàng của bạn đang trống!');
            return;
        }

        if (!selectedAddressId) {
            toast.warning('Vui lòng chọn địa chỉ giao hàng!');
            return;
        }

        const addr = addresses.find(a => a.addressId === selectedAddressId);
        if (!addr) return;

        const fullAddress = `${addr.addressDetail}, ${addr.ward}, ${addr.district}, ${addr.province}`;
        
        setIsProcessing(true);
        try {
            await orderApi.checkout({
                shippingName: addr.receiverName,
                shippingPhone: addr.phone,
                shippingAddress: fullAddress,
                paymentMethod: paymentMethod,
                note: note
            });
            await refresh(); // Clear cart in UI Context
            toast.success('Đặt hàng thành công!');
            navigate('/orders');
        } catch (err: any) {
            toast.error(err.message || 'Có lỗi xảy ra khi đặt hàng');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                <h1 className="text-2xl font-bold text-slate-900 mb-8">Thanh toán</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <DeliveryAddress 
                            addresses={addresses} 
                            selectedAddressId={selectedAddressId} 
                            onSelect={setSelectedAddressId} 
                        />
                        <PaymentMethod 
                            selectedMethod={paymentMethod} 
                            onChange={setPaymentMethod} 
                        />
                        <OrderNote 
                            value={note} 
                            onChange={setNote} 
                        />
                    </div>
                    <div className="lg:col-span-4">
                        <OrderSummary 
                            onCheckout={handleCheckout} 
                            isProcessing={isProcessing} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;
