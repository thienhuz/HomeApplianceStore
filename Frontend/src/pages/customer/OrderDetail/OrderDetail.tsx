import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    const handleChangeTab = (tab: ProfileTabKey) => {
        if (tab !== 'orders') {
            navigate('/profile', { state: { tab } });
        } else {
            navigate('/orders');
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

                <section className="flex-grow space-y-stack-lg">
                    {/* Header & Navigation */}
                    <div className="space-y-2">
                        <Link className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-body-sm" to="/orders">
                            <span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
                            Quay lại danh sách đơn hàng
                        </Link>
                        <h1 className="font-headline-lg text-headline-lg">Chi tiết đơn hàng #ORD-123456</h1>
                        <p className="text-body-sm text-on-surface-variant">Ngày đặt hàng: 12 tháng 10, 2024</p>
                    </div>

                    <OrderTimeline />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        <ShippingInfo />
                        <OrderSummary />
                    </div>

                    <ProductList />

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row justify-end gap-stack-md pt-stack-lg">
                        <button className="px-8 py-3 rounded-lg border border-outline text-label-md text-on-surface-variant hover:bg-surface-container transition-all active:scale-95" type="button">
                            Yêu cầu hỗ trợ
                        </button>
                        <button className="px-8 py-3 rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold hover:shadow-lg transition-all active:scale-95" type="button">
                            Mua lại đơn hàng này
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default OrderDetail;
