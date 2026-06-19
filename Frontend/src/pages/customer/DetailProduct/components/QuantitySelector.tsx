import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-slate-700">Số lượng</label>
    <div className="flex items-center w-32 border border-slate-200 rounded-xl overflow-hidden h-10">
      <button
        onClick={() => onChange(Math.max(quantity - 1, 1))}
        className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
      </button>
      <input
        className="w-10 text-center border-none bg-transparent focus:ring-0 font-semibold text-sm text-slate-900 p-0"
        max={24}
        min={1}
        type="number"
        value={quantity}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
      />
      <button
        onClick={() => onChange(Math.min(quantity + 1, 24))}
        className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  </div>
);

export default QuantitySelector;
