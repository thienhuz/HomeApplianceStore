import React from 'react';

const statusTabs = [
    'Tất cả',
    'Chờ thanh toán',
    'Đang xử lý',
    'Đang giao',
    'Đã giao',
    'Đã hủy',
];

interface OrderStatusTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const OrderStatusTabs: React.FC<OrderStatusTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="mb-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
            <div className="flex gap-0 whitespace-nowrap min-w-max">
                {statusTabs.map((tab) => (
                    <button
                        key={tab}
                        className={`text-sm font-medium py-3 px-4 transition-colors relative ${
                            activeTab === tab
                                ? 'text-primary'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                        onClick={() => onTabChange(tab)}
                        type="button"
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusTabs;
