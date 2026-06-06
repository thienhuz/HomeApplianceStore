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
  <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] p-stack-lg md:p-margin-mobile border border-outline-variant/10">
    <div className="flex justify-between items-center mb-stack-lg">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">Thông tin cá nhân</h2>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-base px-gutter py-base rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors active:scale-95"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
        Chỉnh sửa
      </button>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-stack-lg mb-stack-lg">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container ring-1 ring-primary/20">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface text-primary text-3xl font-semibold">
              {initials}
            </div>
          )}
        </div>
        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-container transition-transform hover:scale-110 active:scale-90">
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
        </button>
      </div>

      <div className="text-center md:text-left">
        <h3 className="font-headline-md text-headline-md text-on-surface">{user.fullName}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Khách hàng từ {memberSinceLabel}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <div className="space-y-stack-sm">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Họ và tên</label>
        <div className="p-stack-md bg-surface-container rounded-lg font-body-md text-body-md text-on-surface">{user.fullName}</div>
      </div>
      <div className="space-y-stack-sm">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email</label>
        <div className="p-stack-md bg-surface-container rounded-lg font-body-md text-body-md text-on-surface">{user.email}</div>
      </div>
      <div className="space-y-stack-sm">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Số điện thoại</label>
        <div className="p-stack-md bg-surface-container rounded-lg font-body-md text-body-md text-on-surface">{user.phone || 'Chưa có thông tin'}</div>
      </div>
      <div className="space-y-stack-sm">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Địa chỉ</label>
        <div className="p-stack-md bg-surface-container rounded-lg font-body-md text-body-md text-on-surface">{user.address || 'Chưa có thông tin'}</div>
      </div>
    </div>
  </div>
);

export default ProfilePersonalInfo;
