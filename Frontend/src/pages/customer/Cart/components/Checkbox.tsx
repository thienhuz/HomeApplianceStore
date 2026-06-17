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
      className={`w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-all active:scale-90 ${
        active
          ? 'bg-primary border-primary text-white'
          : 'bg-surface-container-lowest border-outline-variant hover:border-primary'
      }`}
    >
      {active && (
        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 600" }}>
          {indeterminate ? 'remove' : 'check'}
        </span>
      )}
    </button>
  );
};

export default Checkbox;
