import React, { useState } from 'react';

const ProfilePasswordSection: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900">Đổi mật khẩu</h2>
        <p className="text-sm text-slate-500 mt-1">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>
      
      <div className="px-8 py-8">
        <form className="max-w-xl space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="w-48 text-sm font-medium text-slate-500 shrink-0">Mật khẩu hiện tại</label>
            <div className="relative flex-grow">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">{showCurrentPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
            <label className="w-48 text-sm font-medium text-slate-500 shrink-0 sm:pt-3">Mật khẩu mới</label>
            <div className="flex-grow">
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">{showNewPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <div className="mt-2 flex items-start gap-2 text-slate-500 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5 text-slate-400">info</span>
                <p className="text-xs leading-relaxed">Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ cái và số để đảm bảo an toàn.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="w-48 text-sm font-medium text-slate-500 shrink-0">Xác nhận mật khẩu mới</label>
            <div className="relative flex-grow">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="pt-4 flex sm:justify-end">
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary/90 transition-colors" type="submit">
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePasswordSection;
