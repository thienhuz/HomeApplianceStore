import React from 'react';
import type { AuthUser } from '../../../../types';

interface ProfilePersonalInfoProps {
  user: AuthUser;
  initials: string;
  memberSinceLabel: string;
  onEdit?: () => void;
}

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({
  user,
  initials,
  memberSinceLabel,
  onEdit,
}) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
    <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Thông tin cá nhân</h2>
        <p className="text-sm text-slate-500 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium"
      >
        <span className="material-symbols-outlined text-[18px]">edit</span>
        Chỉnh sửa
      </button>
    </div>

    <div className="px-8 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 pb-8 border-b border-slate-100">
        <div className="relative group flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 ring-4 ring-slate-50 shadow-sm">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500 text-3xl font-semibold">
                {initials}
              </div>
            )}
          </div>
          <button className="absolute -bottom-1 -right-1 bg-white text-slate-500 p-2 rounded-xl shadow-md border border-slate-200 hover:text-primary hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        <div className="text-center md:text-left flex-grow pt-2">
          <h3 className="text-lg font-semibold text-slate-900">{user.fullName}</h3>
          <p className="text-sm text-slate-500 mt-1">Khách hàng từ {memberSinceLabel}</p>
        </div>
      </div>

      <div className="space-y-0">
        <div className="py-4 flex flex-col sm:flex-row sm:items-center border-b border-slate-100">
          <div className="w-48 text-sm font-medium text-slate-500 mb-1 sm:mb-0">Họ và tên</div>
          <div className="text-[15px] text-slate-900 flex-grow">{user.fullName}</div>
        </div>
        <div className="py-4 flex flex-col sm:flex-row sm:items-center border-b border-slate-100">
          <div className="w-48 text-sm font-medium text-slate-500 mb-1 sm:mb-0">Email</div>
          <div className="text-[15px] text-slate-900 flex-grow">{user.email}</div>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Đã xác minh
          </span>
        </div>
        <div className="py-4 flex flex-col sm:flex-row sm:items-center border-b border-slate-100">
          <div className="w-48 text-sm font-medium text-slate-500 mb-1 sm:mb-0">Số điện thoại</div>
          <div className="text-[15px] text-slate-900 flex-grow">{user.phone || <span className="text-slate-400 italic">Chưa có thông tin</span>}</div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePersonalInfo;
