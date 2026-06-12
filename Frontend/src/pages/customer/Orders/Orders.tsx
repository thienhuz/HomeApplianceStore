import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ProfileSidebar } from '../../Auth/components/profile';
import type { ProfileTabKey } from '../../Auth/components/profile';
import OrderStatusTabs from './components/OrderStatusTabs';
import OrderCard from './components/OrderCard';

const ordersData = [
    {
        orderId: '#ORD-123456',
        date: '24/10/2023',
        status: 'Chờ thanh toán',
        statusStyle: 'bg-primary-container/10 text-primary',
        totalAmount: '24.990.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5w1m4RWqn5A2-bQnvJHipBx0JRD455zKHVuiTOyIU_vVWUjCv8P7otkP9IrUFRt-RE7PJlSrvY-iIXFfIOAcOW_C0dJ9q3JKxUKcqrNxTYj3gkvZXiIMuAYkGUhNDeGXRYhom6SJOkbbMXmMP3DKjeD71ymirInxNoPbnQ3mvEedoqyCYOgLFi2X9lQVyiFlJjv0qscca34GLHss_QRpeCYrB-Y6q6SjKyOUq0mxLaOT6dnegrMGNWjSOd-ScsxHIQWPlS3iyQ',
        productImageAlt: 'Refrigerator',
        productTitle: 'Tủ lạnh Bespoke Multi Door 648L',
        productSubtitle: 'và 2 sản phẩm khác',
    },
    {
        orderId: '#ORD-123789',
        date: '20/10/2023',
        status: 'Đang giao',
        statusStyle: 'bg-tertiary-container/10 text-tertiary',
        totalAmount: '15.450.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC3cbqhaTzK9O-6-UOc890oZFUlPUhiyaYncmHM1dK-nRzNA_C6wF-n1uxzYmcDGG4RkbJ7QXFfxOTegom1er35O5keIOWSqpDq_EhjKs4080vNP3rod_TPSJtOgmJvTHIajfpkV1SjbPkkyAWmBNfLJGEN3a23X9QQjYQWG8tj9eULOmi6widNXdAosWUJ2T1KxUJo0hWGtNuLT2Z-hUljSI7kbh1-rPCIhfvTJttWNn28GmcXbQhg04CVbNbDBg6jHvjPbTp-g',
        productImageAlt: 'Washing Machine',
        productTitle: 'Máy giặt Inverter AI Ecobubble 12kg',
        productSubtitle: 'Sản phẩm đơn lẻ',
    },
    {
        orderId: '#ORD-120112',
        date: '15/09/2023',
        status: 'Đã giao',
        statusStyle: 'bg-secondary-container text-on-secondary-container',
        totalAmount: '8.200.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqsiGYQlcJ3WZFX4-KhEctC8Tamf9OM6iWlWcd3EHiU7TPBI8Tehec5VSxqtw9iu7_ddMtnRp40SEBmIKV_ZR5G4UDYPUKL1U2MwbYXN8vZl-lRyXI-7nxubN2AqF30Pw4y5cKNl5TlGQ4elqmQSAza-K9WX9ATSMuHNer0wP2yns017KXSkLFHy6mVAESyLNmlLoGDZVfanQ5yvHJMcynXojCpd_kNPHjf69sPxRppukQQd4PY7lH6noiyj2KbZv3ztfC8WEqtg',
        productImageAlt: 'Microwave Oven',
        productTitle: 'Lò nướng đối lưu Smart Air 40L',
        productSubtitle: 'và 1 sản phẩm khác',
        cardExtraClass: 'opacity-90 hover:opacity-100',
    },
    {
        orderId: '#ORD-119888',
        date: '01/09/2023',
        status: 'Đã hủy',
        statusStyle: 'bg-error-container text-on-error-container',
        totalAmount: '2.100.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa4l8qNfxREuuQdW-a8T_sPS19x9vhv6UzHDLriV1WwXMdbj9Nox9dV0aZ6Q29qgKHb7duBrgqsd8npXVRhYinTHLR1XVtMiTRV2hgYzleSCeFJmAYit5ewin00d7CLEO4J2QZvssHYWycAY0IEArXr8eOrzh0YYFc30m89w2yqnR-p4Nx0R_L_7MT8wzaXtMeQjIi9GFN_8c_HduJttFJapGurOUpm3NZ1eeDQd-ZyCsNcBPVDWCecU9b2AeFGZufg0Tuia-ROA',
        productImageAlt: 'Smart Kettle',
        productTitle: 'Ấm đun nước thông minh WiFi Pro',
        productSubtitle: 'Sản phẩm đơn lẻ',
        cardExtraClass: 'grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100',
    },
];

const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Tất cả');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    const handleChangeTab = (tab: ProfileTabKey) => {
        if (tab !== 'orders') {
            navigate('/profile', { state: { tab } });
        }
    };

    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg">
            <div className="flex flex-col md:flex-row gap-gutter">
                <aside className="w-full md:w-80 flex-shrink-0">
                    <ProfileSidebar
                        user={user}
                        activeTab="orders"
                        onChangeTab={handleChangeTab}
                        onLogout={() => { logout(); navigate('/'); }}
                        onNavigateOrders={() => {}}
                    />
                </aside>

                <section className="flex-grow">
                    <div className="flex items-center justify-between mb-stack-md">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface">Đơn hàng của tôi</h1>
                    </div>

                    <OrderStatusTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="space-y-stack-md">
                        {ordersData.map((order) => (
                            <OrderCard key={order.orderId} {...order} />
                        ))}
                    </div>

                    <div className="mt-stack-lg flex justify-center">
                        <button className="px-gutter py-2 border border-outline rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95" type="button">
                            Tải thêm đơn hàng
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Orders;
