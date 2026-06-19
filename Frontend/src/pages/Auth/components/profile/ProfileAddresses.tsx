import React from 'react';
import type { AuthUser } from '../../../../types';

interface ProfileAddressesProps {
  user: AuthUser;
}

const ProfileAddresses: React.FC<ProfileAddressesProps> = ({ user }) => {
  const addressValue = user.address || 'Chưa có địa chỉ';
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Quản lý địa chỉ</h2>
          <p className="text-sm text-slate-500 mt-1">Quản lý địa chỉ nhận hàng của bạn</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm địa chỉ mới
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          {/* Default Address Card */}
          <div className="relative p-6 border-2 border-primary/20 bg-primary/[0.02] rounded-2xl transition-colors hover:border-primary/30">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl">
              Mặc định
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-xl text-[20px]">home</span>
                <span className="text-base font-semibold text-slate-900">Nhà riêng</span>
              </div>
              <div className="flex gap-1.5">
                <button className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors" title="Chỉnh sửa">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Xóa">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">person</span>
                <span className="text-sm font-medium text-slate-900">{user.fullName}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">call</span>
                <span className="text-sm text-slate-600">{user.phone || 'Chưa có số điện thoại'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400 mt-0.5">location_on</span>
                <span className="text-sm text-slate-600 leading-relaxed">{addressValue}</span>
              </div>
            </div>
          </div>

          {/* Secondary Address Card */}
          <div className="relative p-6 border border-slate-200 rounded-2xl transition-colors hover:border-slate-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500 bg-slate-100 p-2.5 rounded-xl text-[20px]">domain</span>
                <span className="text-base font-semibold text-slate-900">Văn phòng</span>
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors" title="Chỉnh sửa">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Xóa">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">person</span>
                <span className="text-sm font-medium text-slate-900">{user.fullName} (Nhờ lễ tân nhận giúp)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">call</span>
                <span className="text-sm text-slate-600">{user.phone || 'Chưa có số điện thoại'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400 mt-0.5">location_on</span>
                <span className="text-sm text-slate-600 leading-relaxed">{addressValue}</span>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button className="text-primary text-xs font-semibold uppercase tracking-wider hover:text-primary/80 transition-colors">
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
