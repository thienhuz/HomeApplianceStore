import React from 'react';

const VoucherInput: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200">
    <h4 className="text-sm font-semibold text-slate-900 mb-3">Mã giảm giá</h4>
    <div className="flex gap-2">
      <input
        className="flex-grow min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
        placeholder="Nhập mã ưu đãi"
        type="text"
      />
      <button
        type="button"
        className="shrink-0 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
      >
        Áp dụng
      </button>
    </div>
  </div>
);

export default VoucherInput;
