import React from 'react';

interface AuthFieldProps {
  id: string;
  label: string;
  icon: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  /** Action shown on the right edge of the input, e.g. a link beside the label. */
  labelAction?: React.ReactNode;
  /** Element rendered inside the input on the right, e.g. a password visibility toggle. */
  trailing?: React.ReactNode;
  /** Extra content rendered below the input, e.g. a password strength meter. */
  children?: React.ReactNode;
}

const AuthField: React.FC<AuthFieldProps> = ({
  id,
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  labelAction,
  trailing,
  children,
}) => (
  <div className="space-y-stack-sm">
    <div className="flex justify-between items-center">
      <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor={id}>
        {label}
      </label>
      {labelAction}
    </div>
    <div className="relative group">
      <span
        className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
          error ? 'text-error' : 'text-secondary group-focus-within:text-primary'
        }`}
      >
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={`w-full pl-10 ${trailing ? 'pr-12' : 'pr-4'} py-3 bg-surface-container-low border rounded-lg outline-none transition-all font-body-md text-body-md focus:ring-2 ${
          error
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-outline-variant focus:border-primary focus:ring-primary/20'
        }`}
      />
      {trailing}
    </div>
    {children}
    {error && (
      <p className="flex items-center gap-1 text-error font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-[16px]">error</span>
        {error}
      </p>
    )}
  </div>
);

export default AuthField;
