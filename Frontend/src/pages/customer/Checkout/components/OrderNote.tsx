import React from 'react';

interface OrderNoteProps {
    value: string;
    onChange: (value: string) => void;
}

const OrderNote: React.FC<OrderNoteProps> = ({ value, onChange }) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-xl">sticky_note_2</span>
                <h2 className="text-lg font-semibold text-slate-800">Ghi chú đơn hàng</h2>
            </div>
            <textarea 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-h-[120px] rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-primary p-4 text-sm text-slate-800 placeholder:text-slate-400 transition-all resize-y outline-none" 
                placeholder="Nhập lời nhắn cho người bán hoặc yêu cầu giao hàng đặc biệt..."
            />
        </section>
    );
};

export default OrderNote;
