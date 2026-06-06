import React, { useState } from 'react';

const ProfilePasswordSection: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] p-stack-lg md:p-margin-mobile border border-outline-variant/10">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Đổi mật khẩu</h2>
      <form className="max-w-md space-y-gutter" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-stack-sm">
          <label className="font-label-md text-label-md text-on-surface">Mật khẩu hiện tại</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              className="w-full p-stack-md bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-stack-md top-1/2 -translate-y-1/2 text-on-surface-variant"
            >
              <span className="material-symbols-outlined">{showCurrentPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-stack-sm">
          <label className="font-label-md text-label-md text-on-surface">Mật khẩu mới</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="w-full p-stack-md bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-stack-md top-1/2 -translate-y-1/2 text-on-surface-variant"
            >
              <span className="material-symbols-outlined">{showNewPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ cái và số.</p>
        </div>

        <div className="space-y-stack-sm">
          <label className="font-label-md text-label-md text-on-surface">Xác nhận mật khẩu mới</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full p-stack-md bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-stack-md top-1/2 -translate-y-1/2 text-on-surface-variant"
            >
              <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <div className="pt-stack-md">
          <button className="w-full sm:w-auto px-margin-mobile py-stack-md bg-primary text-white font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-95" type="submit">
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePasswordSection;
