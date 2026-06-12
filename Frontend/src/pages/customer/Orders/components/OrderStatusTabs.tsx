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
        <div className="mb-stack-lg border-b border-surface-container-highest overflow-x-auto no-scrollbar">
            <div className="flex gap-stack-lg whitespace-nowrap min-w-max pb-px">
                {statusTabs.map((tab) => (
                    <button
                        key={tab}
                        className={`font-label-md text-label-md py-stack-md px-stack-sm active:scale-95 transition-all ${
                            activeTab === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-on-surface-variant hover:text-primary'
                        }`}
                        onClick={() => onTabChange(tab)}
                        type="button"
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusTabs;
