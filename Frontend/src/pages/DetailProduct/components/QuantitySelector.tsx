import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange }) => (
  <div className="flex flex-col gap-stack-sm">
    <label className="font-label-md text-label-md text-on-surface">Số lượng</label>
    <div className="flex items-center w-32 border border-outline rounded-lg overflow-hidden h-12">
      <button
        onClick={() => onChange(Math.max(quantity - 1, 1))}
        className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-highest active:bg-surface-container transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined">remove</span>
      </button>
      <input
        className="w-12 text-center border-none bg-transparent focus:ring-0 font-bold p-0"
        max={24}
        min={1}
        type="number"
        value={quantity}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
      />
      <button
        onClick={() => onChange(Math.min(quantity + 1, 24))}
        className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-highest active:bg-surface-container transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  </div>
);

export default QuantitySelector;
