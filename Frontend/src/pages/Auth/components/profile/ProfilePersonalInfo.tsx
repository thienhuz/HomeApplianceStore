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
  <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] overflow-hidden border border-outline-variant/10">
    <div className="p-stack-lg border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-stack-md">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Thông tin cá nhân</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-base px-gutter py-2 rounded-lg border border-outline hover:border-primary hover:text-primary transition-colors active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">edit</span>
        <span className="font-label-md text-label-md">Chỉnh sửa</span>
      </button>
    </div>

    <div className="p-stack-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-stack-lg mb-stack-lg pb-stack-lg border-b border-surface-variant/50">
        <div className="relative group flex-shrink-0">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-surface-container ring-4 ring-primary/5 shadow-sm">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary-container text-on-secondary-container text-4xl font-semibold">
                {initials}
              </div>
            )}
          </div>
          <button className="absolute bottom-1 right-1 bg-surface-container-lowest text-on-surface-variant p-2 rounded-full shadow-md border border-outline-variant hover:text-primary transition-transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        <div className="text-center md:text-left flex-grow pt-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">{user.fullName}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Khách hàng từ {memberSinceLabel}</p>
        </div>
      </div>

      <div className="space-y-0">
        <div className="py-stack-md flex flex-col sm:flex-row sm:items-center border-b border-surface-variant/50">
          <div className="w-48 font-label-md text-label-md text-on-surface-variant mb-1 sm:mb-0">Họ và tên</div>
          <div className="font-body-md text-body-md text-on-surface flex-grow">{user.fullName}</div>
        </div>
        <div className="py-stack-md flex flex-col sm:flex-row sm:items-center border-b border-surface-variant/50">
          <div className="w-48 font-label-md text-label-md text-on-surface-variant mb-1 sm:mb-0">Email</div>
          <div className="font-body-md text-body-md text-on-surface flex-grow">{user.email}</div>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Đã xác minh
          </span>
        </div>
        <div className="py-stack-md flex flex-col sm:flex-row sm:items-center border-b border-surface-variant/50">
          <div className="w-48 font-label-md text-label-md text-on-surface-variant mb-1 sm:mb-0">Số điện thoại</div>
          <div className="font-body-md text-body-md text-on-surface flex-grow">{user.phone || <span className="text-on-surface-variant italic">Chưa có thông tin</span>}</div>
        </div>
        <div className="py-stack-md flex flex-col sm:flex-row sm:items-start border-b border-surface-variant/50">
          <div className="w-48 font-label-md text-label-md text-on-surface-variant mb-1 sm:mb-0 pt-1">Địa chỉ mặc định</div>
          <div className="font-body-md text-body-md text-on-surface flex-grow leading-relaxed max-w-lg">{user.address || <span className="text-on-surface-variant italic">Chưa thiết lập địa chỉ</span>}</div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePersonalInfo;

