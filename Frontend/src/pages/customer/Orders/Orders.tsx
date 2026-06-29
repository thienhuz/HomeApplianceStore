import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ProfileSidebar } from '../../Auth/components/profile';
import type { ProfileTabKey } from '../../Auth/components/profile';
import OrderStatusTabs from './components/OrderStatusTabs';
import OrderCard from './components/OrderCard';

import { orderApi } from '../../../services/orderApi';
import type { OrderHistory } from '../../../types/order';

const mapTabToStatus = (tab: string): number | undefined => {
    switch (tab) {
        case 'Chờ thanh toán': return 1;
        case 'Đang xử lý': return 2;
        case 'Đang giao': return 3;
        case 'Đã giao': return 4;
        case 'Đã hủy': return 5;
        default: return undefined;
    }
};

const getStatusInfo = (statusByte: number) => {
    switch (statusByte) {
        case 1: return { text: 'Chờ thanh toán', style: 'bg-amber-50 text-amber-700 border border-amber-200/60' };
        case 2: return { text: 'Đang xử lý', style: 'bg-blue-50 text-blue-700 border border-blue-200/60' };
        case 3: return { text: 'Đang giao', style: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' };
        case 4: return { text: 'Đã giao', style: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' };
        case 5: return { text: 'Đã hủy', style: 'bg-red-50 text-red-600 border border-red-200/60' };
        default: return { text: 'Khác', style: 'bg-slate-50 text-slate-700 border border-slate-200/60' };
    }
};

const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Tất cả');
    const [orders, setOrders] = useState<OrderHistory[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [isPaginationMode, setIsPaginationMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const fetchOrders = async (page: number, size: number, tab: string) => {
        try {
            setIsLoading(true);
            const statusByte = mapTabToStatus(tab);
            const res = await orderApi.getMyOrders(page, size, statusByte);
            setOrders(res.items);
            setTotalCount(res.totalItems);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchOrders(pageIndex, pageSize, activeTab);
        }
    }, [user, navigate, pageIndex, pageSize, activeTab]);

    if (!user) return null;

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Reset pagination when changing tab
        setPageIndex(1);
        setPageSize(4);
        setIsPaginationMode(false);
    };

    const handleChangeTab = (tab: ProfileTabKey) => {
        if (tab !== 'orders') {
            navigate('/profile', { state: { tab } });
        }
    };

    const handleLoadMore = () => {
        setPageSize(10);
        setPageIndex(1);
        setIsPaginationMode(true);
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

                    <OrderStatusTabs activeTab={activeTab} onTabChange={handleTabChange} />

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                            <span className="material-symbols-outlined text-6xl text-slate-200 mb-3">inbox</span>
                            <p className="text-slate-500">Chưa có đơn hàng nào.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const statusInfo = getStatusInfo(order.orderStatus);
                                return (
                                    <OrderCard 
                                        key={order.orderId}
                                        orderId={`#ORD-${order.orderId.toString().padStart(6, '0')}`}
                                        date={new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short' }).format(new Date(order.orderDate))}
                                        status={statusInfo.text}
                                        statusStyle={statusInfo.style}
                                        totalAmount={`${order.totalAmount.toLocaleString('vi-VN')}₫`}
                                        productImage={order.firstProductImageUrl || '/placeholder-image.png'}
                                        productImageAlt={order.firstProductTitle || 'Product'}
                                        productTitle={order.firstProductTitle || 'Sản phẩm'}
                                        productSubtitle={order.totalProductCount > 1 ? `và ${order.totalProductCount - 1} sản phẩm khác` : 'Sản phẩm đơn lẻ'}
                                        cardExtraClass={order.orderStatus === 5 ? 'opacity-70 hover:opacity-100' : ''}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {!isLoading && !isPaginationMode && totalCount > 4 && (
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={handleLoadMore}
                                className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors" 
                                type="button"
                            >
                                Tải thêm đơn hàng
                            </button>
                        </div>
                    )}

                    {!isLoading && isPaginationMode && Math.ceil(totalCount / 10) > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {Array.from({ length: Math.ceil(totalCount / 10) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPageIndex(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                                        pageIndex === i + 1 
                                        ? 'bg-primary text-white shadow-sm' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Orders;
