import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderApi } from '../../../services/orderApi';
import type { OrderDto } from '../../../types/order';
import { useAuth } from '../../../context/AuthContext';
import { ProfileSidebar } from '../../Auth/components/profile';
import type { ProfileTabKey } from '../../Auth/components/profile';
import OrderTimeline from './components/OrderTimeline';
import ShippingInfo from './components/ShippingInfo';
import OrderSummary from './components/OrderSummary';
import ProductList from './components/ProductList';

const OrderDetail: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    useEffect(() => {
        const fetchOrder = async () => {
            if (id) {
                try {
                    setIsLoading(true);
                    const numericId = id.replace(/[^0-9]/g, '');
                    const parsedId = parseInt(numericId, 10);
                    if (!isNaN(parsedId)) {
                        const data = await orderApi.getOrderById(parsedId);
                        setOrder(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch order', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        if (user) {
            fetchOrder();
        }
    }, [id, user]);

    const handleCancelOrder = async () => {
        if (!order || isCancelling) return;

        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            try {
                setIsCancelling(true);
                await orderApi.cancelOrder(order.orderId);
                toast.success('Hủy đơn hàng thành công!');
                setOrder(prev => prev ? { ...prev, orderStatus: 5 } : null);
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Không thể hủy đơn hàng. Vui lòng thử lại.');
            } finally {
                setIsCancelling(false);
            }
        }
    };

    if (!user) return null;

    const handleChangeTab = (tab: ProfileTabKey) => {
        if (tab !== 'orders') {
            navigate('/profile', { state: { tab } });
        } else {
            navigate('/orders');
        }
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 1: return { text: 'Chờ thanh toán', className: 'bg-amber-50 text-amber-700 border border-amber-200' };
            case 2: return { text: 'Đang xử lý', className: 'bg-blue-50 text-blue-700 border border-blue-200' };
            case 3: return { text: 'Đang giao', className: 'bg-sky-50 text-sky-700 border border-sky-200' };
            case 4: return { text: 'Đã giao', className: 'bg-teal-50 text-teal-700 border border-teal-200' };
            case 5: return { text: 'Đã hủy', className: 'bg-red-50 text-red-600 border border-red-200' };
            case 6: return { text: 'Hoàn thành', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };
            default: return { text: 'Không rõ', className: 'bg-slate-50 text-slate-600 border border-slate-200' };
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
                        onNavigateOrders={() => navigate('/orders')}
                    />
                </aside>

                <section className="flex-grow min-w-0 space-y-6">
                    {/* Breadcrumb */}
                    <Link
                        className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors duration-200 text-[13px] leading-relaxed"
                        to="/orders"
                    >
                        <span className="material-symbols-outlined text-[16px]" data-icon="arrow_back">arrow_back</span>
                        Quay lại danh sách đơn hàng
                    </Link>

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-[22px] font-semibold text-on-surface leading-tight tracking-tight">
                                Đơn hàng {order ? `#ORD-${order.orderId.toString().padStart(6, '0')}` : ''}
                            </h1>
                            <p className="text-[13px] text-on-surface-variant leading-relaxed">
                                {order ? `Đặt ngày ${new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(order.orderDate))}` : ''}
                            </p>
                        </div>
                        {order && (
                            <span className={`inline-flex items-center self-start px-3 py-1 rounded-lg text-[12px] font-medium leading-none ${getStatusBadge(order.orderStatus).className}`}>
                                {getStatusBadge(order.orderStatus).text}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex justify-center py-16">
                            <div className="w-8 h-8 border-[3px] border-slate-200 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : !order ? (
                        <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/40">
                            <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block" data-icon="receipt_long">receipt_long</span>
                            <p className="text-on-surface-variant text-[14px]">Không tìm thấy đơn hàng.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <OrderTimeline status={order.orderStatus} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ShippingInfo
                                    name={order.shippingName}
                                    phone={order.shippingPhone}
                                    address={order.shippingAddress}
                                    paymentMethod={order.paymentMethod}
                                    note={order.note}
                                />
                                <OrderSummary
                                    totalAmount={order.totalAmount}
                                    discountAmount={order.discountAmount}
                                    finalAmount={order.finalAmount}
                                    itemCount={order.items.reduce((acc, item) => acc + item.quantity, 0)}
                                />
                            </div>

                            <ProductList items={order.items} />
                        </div>
                    )}

                    {/* Bottom Actions — only show when order loaded */}
                    {order && (
                        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 pt-4 border-t border-outline-variant/30">
                            {(order.orderStatus === 1 || order.orderStatus === 2) && (
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={isCancelling}
                                    className="px-6 py-2.5 rounded-lg border border-red-300 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    {isCancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
                                </button>
                            )}
                            <button
                                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
                                type="button"
                            >
                                Mua lại đơn hàng này
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default OrderDetail;
