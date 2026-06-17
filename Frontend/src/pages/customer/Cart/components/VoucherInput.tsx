import React from 'react';

const VoucherInput: React.FC = () => (
  <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(31,41,55,0.04)]">
    <h4 className="font-label-md text-label-md mb-3 text-on-surface">Mã giảm giá</h4>
    <div className="flex gap-2">
      <input
        className="flex-grow min-w-0 bg-surface-container-low border-none rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none font-body-sm text-body-sm"
        placeholder="Nhập mã ưu đãi"
        type="text"
      />
      <button
        type="button"
        className="shrink-0 whitespace-nowrap bg-secondary text-on-secondary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-on-secondary-fixed-variant transition-colors active:scale-95"
      >
        Áp dụng
      </button>
    </div>
  </div>
);

export default VoucherInput;
