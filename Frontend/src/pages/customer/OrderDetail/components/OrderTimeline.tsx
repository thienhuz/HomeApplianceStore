import React from 'react';

const OrderTimeline: React.FC = () => {
    return (
        <div className="bg-surface-container-lowest p-gutter rounded-xl order-card-shadow overflow-x-auto">
            <div className="min-w-[600px] flex items-center justify-between relative px-8">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container-highest -translate-y-4 mx-20"></div>
                {/* Active Progress Bar */}
                <div className="absolute top-1/2 left-0 w-[66%] h-0.5 bg-primary-container -translate-y-4 mx-20"></div>

                {/* Step 1 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]" data-icon="check">check</span>
                    </div>
                    <span className="text-label-sm text-primary">Chờ xác nhận</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]" data-icon="verified">verified</span>
                    </div>
                    <span className="text-label-sm text-primary">Đã xác nhận</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white ring-4 ring-primary-fixed/30 animate-pulse">
                        <span className="material-symbols-outlined text-[20px]" data-icon="local_shipping">local_shipping</span>
                    </div>
                    <span className="text-label-sm text-primary font-bold">Đang giao hàng</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center gap-2 relative z-10 opacity-40">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]" data-icon="done_all">done_all</span>
                    </div>
                    <span className="text-label-sm">Giao hàng thành công</span>
                </div>
            </div>
        </div>
    );
};

export default OrderTimeline;
