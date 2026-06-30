import React from 'react';

interface OrderTimelineProps {
    status: number;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
    if (status === 5) {
        return (
            <div className="bg-surface-container-lowest px-6 py-8 rounded-xl border border-red-200/60 flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[32px] text-red-400" data-icon="cancel">cancel</span>
                <p className="text-red-600 font-medium text-[14px]">Đơn hàng đã bị hủy</p>
            </div>
        );
    }

    const steps = [
        { id: 1, label: 'Chờ thanh toán', icon: 'pending_actions', activeStatuses: [1, 2, 3, 4, 6] },
        { id: 2, label: 'Đang xử lý', icon: 'verified', activeStatuses: [2, 3, 4, 6] },
        { id: 3, label: 'Đang giao', icon: 'local_shipping', activeStatuses: [3, 4, 6] },
        { id: 4, label: 'Đã giao', icon: 'inventory', activeStatuses: [4, 6] },
        { id: 5, label: 'Hoàn thành', icon: 'done_all', activeStatuses: [6] }
    ];

    let currentStep = 0;
    for (const step of steps) {
        if (step.activeStatuses.includes(status)) {
            currentStep = step.id;
        }
    }

    const progressPercentage = currentStep === 0 ? 0 : ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="bg-surface-container-lowest px-6 py-6 rounded-xl border border-outline-variant/30 overflow-x-auto">
            <div className="min-w-[520px] flex items-center justify-between relative px-4">
                {/* Track bg */}
                <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-100 mx-16"></div>
                {/* Track active */}
                <div
                    className="absolute top-4 left-0 h-[2px] bg-primary/70 mx-16 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;
                    const isFuture = currentStep < step.id;

                    return (
                        <div
                            key={step.id}
                            className={`flex flex-col items-center gap-2 relative z-10 transition-opacity duration-300 ${isFuture ? 'opacity-30' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                ${isCompleted
                                    ? 'bg-primary text-white'
                                    : isActive
                                        ? 'bg-primary text-white ring-[3px] ring-primary/20'
                                        : 'bg-slate-100 text-slate-400'
                                }
                            `}>
                                <span className="material-symbols-outlined text-[18px]" data-icon={step.icon}>{step.icon}</span>
                            </div>
                            <span className={`text-[11px] leading-tight whitespace-nowrap
                                ${isActive ? 'text-primary font-semibold' : isCompleted ? 'text-on-surface font-medium' : 'text-slate-400'}
                            `}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTimeline;
