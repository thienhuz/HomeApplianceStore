import React from 'react';
import type { AuthUser } from '../../../../types';
import type { ProfileTabKey } from './index';

interface ProfileSidebarProps {
  user: AuthUser;
  activeTab: ProfileTabKey;
  onChangeTab: (tab: ProfileTabKey) => void;
  onLogout: () => void;
  onNavigateOrders: () => void;
}

interface NavItem {
  key: ProfileTabKey;
  icon: string;
  label: string;
  onClick: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  activeTab,
  onChangeTab,
  onLogout,
  onNavigateOrders,
}) => {
  const navItems: NavItem[] = [
    { key: 'personal-info', icon: 'person', label: 'Thông tin cá nhân', onClick: () => onChangeTab('personal-info') },
    { key: 'addresses', icon: 'location_on', label: 'Quản lý địa chỉ', onClick: () => onChangeTab('addresses') },
    { key: 'password', icon: 'lock', label: 'Đổi mật khẩu', onClick: () => onChangeTab('password') },
    { key: 'orders', icon: 'shopping_bag', label: 'Đơn hàng của tôi', onClick: onNavigateOrders },
  ];

  const initials = user.fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 md:sticky md:top-24">
      {/* Header with gradient banner */}
      <div className="relative">
        <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-900" />
        <div className="px-6 pb-6 -mt-8 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-slate-600 text-xl font-semibold ring-4 ring-white shadow-sm">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.fullName} className="h-full w-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <span
              className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"
              title="Đang hoạt động"
            />
          </div>
          <p className="font-semibold text-slate-900 mt-4 text-[15px]">{user.fullName}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            Thành viên Vàng
          </span>
        </div>
      </div>

      <hr className="border-slate-100" />

      <nav className="flex flex-col p-3 gap-0.5">
        {navItems.map((item) => {
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                active
                  ? 'text-primary bg-primary/5 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${active ? 'text-primary' : 'text-slate-400'}`}
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[14px] flex-grow">{item.label}</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-opacity ${
                  active ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-40'
                }`}
              >
                chevron_right
              </span>
            </button>
          );
        })}

        <hr className="my-2 border-slate-100" />

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-red-500 hover:bg-red-50"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-[14px]">Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
