import React from 'react';

interface SocialLoginButtonProps {
  icon: React.ReactNode;
  label: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors active:scale-[0.98]">
    {icon}
    <span className="font-label-md text-label-md text-secondary">{label}</span>
  </button>
);

export default SocialLoginButton;
