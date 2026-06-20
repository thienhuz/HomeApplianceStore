import React from 'react';

interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, indeterminate = false, onChange, ariaLabel }) => {
  const active = checked || indeterminate;

  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-colors ${
        active
          ? 'bg-primary border-primary text-white'
          : 'bg-white border-slate-300 hover:border-primary'
      }`}
    >
      {active && (
        <span className="material-symbols-outlined text-[16px] font-bold">
          {indeterminate ? 'remove' : 'check'}
        </span>
      )}
    </button>
  );
};

export default Checkbox;
