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
        statusStyle: 'bg-amber-50 text-amber-700 border border-amber-200/60',
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
        statusStyle: 'bg-blue-50 text-blue-700 border border-blue-200/60',
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
        statusStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        totalAmount: '8.200.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqsiGYQlcJ3WZFX4-KhEctC8Tamf9OM6iWlWcd3EHiU7TPBI8Tehec5VSxqtw9iu7_ddMtnRp40SEBmIKV_ZR5G4UDYPUKL1U2MwbYXN8vZl-lRyXI-7nxubN2AqF30Pw4y5cKNl5TlGQ4elqmQSAza-K9WX9ATSMuHNer0wP2yns017KXSkLFHy6mVAESyLNmlLoGDZVfanQ5yvHJMcynXojCpd_kNPHjf69sPxRppukQQd4PY7lH6noiyj2KbZv3ztfC8WEqtg',
        productImageAlt: 'Microwave Oven',
        productTitle: 'Lò nướng đối lưu Smart Air 40L',
        productSubtitle: 'và 1 sản phẩm khác',
    },
    {
        orderId: '#ORD-119888',
        date: '01/09/2023',
        status: 'Đã hủy',
        statusStyle: 'bg-red-50 text-red-600 border border-red-200/60',
        totalAmount: '2.100.000₫',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa4l8qNfxREuuQdW-a8T_sPS19x9vhv6UzHDLriV1WwXMdbj9Nox9dV0aZ6Q29qgKHb7duBrgqsd8npXVRhYinTHLR1XVtMiTRV2hgYzleSCeFJmAYit5ewin00d7CLEO4J2QZvssHYWycAY0IEArXr8eOrzh0YYFc30m89w2yqnR-p4Nx0R_L_7MT8wzaXtMeQjIi9GFN_8c_HduJttFJapGurOUpm3NZ1eeDQd-ZyCsNcBPVDWCecU9b2AeFGZufg0Tuia-ROA',
        productImageAlt: 'Smart Kettle',
        productTitle: 'Ấm đun nước thông minh WiFi Pro',
        productSubtitle: 'Sản phẩm đơn lẻ',
        cardExtraClass: 'opacity-70 hover:opacity-100',
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
        <main className="max-w-container-max mx-auto px-6 md:px-8 py-8">
            {/* Breadcrumb + page heading — đồng bộ với trang Profile */}
            <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                <button type="button" onClick={() => navigate('/')} className="hover:text-primary transition-colors">
                    Trang chủ
                </button>
                <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
                <span className="text-slate-900 font-medium">Tài khoản của tôi</span>
            </nav>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Tài khoản của tôi</h1>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <aside className="w-full md:w-80 flex-shrink-0">
                    <ProfileSidebar
                        user={user}
                        activeTab="orders"
                        onChangeTab={handleChangeTab}
                        onLogout={() => { logout(); navigate('/'); }}
                        onNavigateOrders={() => {}}
                    />
                </aside>

                <section className="flex-grow min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Đơn hàng của tôi</h2>
                    </div>

                    <OrderStatusTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="space-y-4">
                        {ordersData.map((order) => (
                            <OrderCard key={order.orderId} {...order} />
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors" type="button">
                            Tải thêm đơn hàng
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Orders;
