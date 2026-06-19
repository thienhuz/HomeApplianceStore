import React from 'react';

const OrderNote: React.FC = () => {
    return (
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl checkout-shadow">
            <div className="flex items-center gap-2 mb-stack-md">
                <span className="material-symbols-outlined text-primary">sticky_note_2</span>
                <h2 className="font-headline-md text-headline-md">Ghi chú đơn hàng</h2>
            </div>
            <textarea 
                className="w-full min-h-[120px] rounded-lg border-outline-variant focus:border-primary focus:ring-primary p-stack-md font-body-sm transition-all" 
                placeholder="Nhập lời nhắn cho người bán hoặc yêu cầu giao hàng đặc biệt..."
            />
        </section>
    );
};

export default OrderNote;
