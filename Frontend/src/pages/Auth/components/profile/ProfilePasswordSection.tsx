import React, { useState } from 'react';

const ProfilePasswordSection: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] overflow-hidden border border-outline-variant/10">
      <div className="p-stack-lg border-b border-surface-variant">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Đổi mật khẩu</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>
      
      <div className="p-stack-lg">
        <form className="max-w-xl space-y-stack-lg" onSubmit={(event) => event.preventDefault()}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-stack-md">
            <label className="w-48 font-label-md text-label-md text-on-surface-variant shrink-0">Mật khẩu hiện tại</label>
            <div className="relative flex-grow">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-on-surface"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">{showCurrentPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-stack-md">
            <label className="w-48 font-label-md text-label-md text-on-surface-variant shrink-0 sm:pt-3">Mật khẩu mới</label>
            <div className="flex-grow">
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-on-surface"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">{showNewPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <div className="mt-2 flex items-start gap-1.5 text-on-surface-variant bg-surface-container p-2 rounded-lg">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-body-sm leading-tight">Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ cái và số để đảm bảo an toàn.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-stack-md">
            <label className="w-48 font-label-md text-label-md text-on-surface-variant shrink-0">Xác nhận mật khẩu mới</label>
            <div className="relative flex-grow">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-on-surface"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="pt-stack-md flex sm:justify-end">
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-95" type="submit">
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePasswordSection;
