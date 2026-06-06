import React from 'react';
import type { AuthUser } from '../../../../types';

interface ProfileAddressesProps {
  user: AuthUser;
}

const ProfileAddresses: React.FC<ProfileAddressesProps> = ({ user }) => {
  const addressValue = user.address || 'Chưa có địa chỉ';
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] p-stack-lg md:p-margin-mobile border border-outline-variant/10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-stack-md mb-stack-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Quản lý địa chỉ</h2>
        <button className="w-full sm:w-auto flex items-center justify-center gap-base px-gutter py-stack-md rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 shadow-md">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm địa chỉ mới
        </button>
      </div>

      <div className="grid grid-cols-1 gap-stack-md">
        <div className="p-stack-lg border border-primary/20 bg-primary-fixed/10 rounded-xl relative group">
          <div className="flex justify-between items-start mb-stack-md">
            <div className="flex items-center gap-stack-md">
              <span className="font-headline-md text-headline-md text-on-surface">Nhà riêng</span>
              <span className="px-stack-md py-stack-sm bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Mặc định</span>
            </div>
            <div className="flex gap-stack-sm">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          <div className="space-y-stack-sm">
            <p className="font-body-md text-body-md font-semibold text-on-surface">{user.fullName}</p>
            <p className="font-body-md text-body-md text-on-surface-variant">{user.phone || 'Chưa có thông tin'}</p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{addressValue}</p>
          </div>
        </div>

        <div className="p-stack-lg border border-outline-variant/30 bg-surface rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-stack-md">
            <span className="font-headline-md text-headline-md text-on-surface">Văn phòng</span>
            <div className="flex gap-stack-sm">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          <div className="space-y-stack-sm">
            <p className="font-body-md text-body-md font-semibold text-on-surface">{user.fullName} (Văn phòng)</p>
            <p className="font-body-md text-body-md text-on-surface-variant">{user.phone || 'Chưa có thông tin'}</p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{addressValue}</p>
          </div>
          <button className="mt-stack-md text-primary font-label-sm text-label-sm hover:underline">Thiết lập mặc định</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAddresses;
