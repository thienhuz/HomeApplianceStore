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
        <div className="mb-6 border-b border-outline-variant/30 overflow-x-auto no-scrollbar">
            <div className="flex gap-0 whitespace-nowrap min-w-max">
                {statusTabs.map((tab) => (
                    <button
                        key={tab}
                        className={`text-[13px] font-medium py-3 px-4 transition-colors duration-200 relative ${
                            activeTab === tab
                                ? 'text-primary'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        onClick={() => onTabChange(tab)}
                        type="button"
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusTabs;
