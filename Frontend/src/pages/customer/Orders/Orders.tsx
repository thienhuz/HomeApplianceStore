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
        case 3: return { text: 'Đang giao', style: 'bg-sky-50 text-sky-700 border border-sky-200/60' };
        case 4: return { text: 'Đã giao', style: 'bg-teal-50 text-teal-700 border border-teal-200/60' };
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
        <main className="max-w-container-max mx-auto px-gutter py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[13px] text-on-surface-variant mb-4">
                <button type="button" onClick={() => navigate('/')} className="hover:text-primary transition-colors duration-200">
                    Trang chủ
                </button>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40">chevron_right</span>
                <span className="text-on-surface font-medium">Tài khoản của tôi</span>
            </nav>
            <h1 className="text-[22px] font-semibold text-on-surface tracking-tight mb-8">Tài khoản của tôi</h1>

            <div className="flex flex-col md:flex-row gap-gutter items-start">
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
                    <h2 className="text-[18px] font-semibold text-on-surface mb-6">Đơn hàng của tôi</h2>

                    <OrderStatusTabs activeTab={activeTab} onTabChange={handleTabChange} />

                    {isLoading ? (
                        <div className="flex justify-center py-16">
                            <div className="w-8 h-8 border-[3px] border-slate-200 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                            <span className="material-symbols-outlined text-[40px] text-on-surface-variant/30 mb-3 block" data-icon="inbox">inbox</span>
                            <p className="text-on-surface-variant text-[14px]">Chưa có đơn hàng nào.</p>
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
                                        cardExtraClass={order.orderStatus === 5 ? 'opacity-60 hover:opacity-100' : ''}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Load More */}
                    {!isLoading && !isPaginationMode && totalCount > 4 && (
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={handleLoadMore}
                                className="px-6 py-2.5 border border-outline-variant/40 rounded-lg text-[13px] font-medium text-on-surface-variant hover:bg-surface-container-low hover:border-outline-variant transition-colors duration-200" 
                                type="button"
                            >
                                Tải thêm đơn hàng
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && isPaginationMode && Math.ceil(totalCount / 10) > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {Array.from({ length: Math.ceil(totalCount / 10) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPageIndex(i + 1)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium transition-colors duration-200 ${
                                        pageIndex === i + 1 
                                        ? 'bg-primary text-on-primary' 
                                        : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
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
