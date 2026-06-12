import React from 'react';
import type { AuthUser } from '../../../../types';

interface ProfileAddressesProps {
  user: AuthUser;
}

const ProfileAddresses: React.FC<ProfileAddressesProps> = ({ user }) => {
  const addressValue = user.address || 'Chưa có địa chỉ';
  
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] overflow-hidden border border-outline-variant/10">
      <div className="p-stack-lg border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-stack-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Quản lý địa chỉ</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Quản lý địa chỉ nhận hàng của bạn</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-base px-gutter py-2 rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm địa chỉ mới
        </button>
      </div>

      <div className="p-stack-lg">
        <div className="grid grid-cols-1 gap-stack-md">
          {/* Default Address Card */}
          <div className="relative p-stack-lg border-2 border-primary/20 bg-primary-fixed/5 rounded-xl transition-shadow hover:shadow-md">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-xl">
              Mặc định
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">home</span>
                <span className="font-headline-md text-headline-md text-on-surface">Nhà riêng</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-on-surface-variant hover:text-primary bg-surface-container rounded hover:bg-primary/10 transition-colors" title="Chỉnh sửa">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-1.5 text-on-surface-variant hover:text-error bg-surface-container rounded hover:bg-error/10 transition-colors" title="Xóa">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] opacity-70">person</span>
                <span className="font-body-md text-body-md font-medium text-on-surface">{user.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] opacity-70">call</span>
                <span className="font-body-md text-body-md">{user.phone || 'Chưa có số điện thoại'}</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <span className="material-symbols-outlined text-[18px] opacity-70 mt-0.5">location_on</span>
                <span className="font-body-md text-body-md leading-relaxed">{addressValue}</span>
              </div>
            </div>
          </div>

          {/* Secondary Address Card */}
          <div className="relative p-stack-lg border border-outline-variant/30 bg-surface rounded-xl transition-all hover:border-outline hover:shadow-md group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant bg-surface-container p-2 rounded-full">domain</span>
                <span className="font-headline-md text-headline-md text-on-surface">Văn phòng</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-on-surface-variant hover:text-primary bg-surface-container rounded hover:bg-primary/10 transition-colors" title="Chỉnh sửa">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-1.5 text-on-surface-variant hover:text-error bg-surface-container rounded hover:bg-error/10 transition-colors" title="Xóa">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] opacity-70">person</span>
                <span className="font-body-md text-body-md font-medium text-on-surface">{user.fullName} (Nhờ lễ tân nhận giúp)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] opacity-70">call</span>
                <span className="font-body-md text-body-md">{user.phone || 'Chưa có số điện thoại'}</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <span className="material-symbols-outlined text-[18px] opacity-70 mt-0.5">location_on</span>
                <span className="font-body-md text-body-md leading-relaxed">{addressValue}</span>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-surface-variant flex justify-end">
              <button className="text-primary font-label-sm text-label-sm uppercase tracking-wider hover:text-primary-container font-semibold transition-colors">
                Thiết lập mặc định
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAddresses;

