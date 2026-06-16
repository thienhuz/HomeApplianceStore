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
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] overflow-hidden border border-outline-variant/10 md:sticky md:top-24">
      {/* Header with gradient banner */}
      <div className="relative">
        <div className="h-16 bg-gradient-to-r from-primary to-primary-fixed-dim" />
        <div className="px-stack-lg pb-stack-lg -mt-8 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary-container flex items-center justify-center text-on-secondary-container text-xl font-semibold ring-4 ring-surface-container-lowest shadow-sm">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.fullName} className="h-full w-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <span
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-surface-container-lowest"
              title="Đang hoạt động"
            />
          </div>
          <p className="font-label-md text-label-md text-on-surface mt-stack-md">{user.fullName}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-on-primary-fixed-variant bg-primary-fixed/40 px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            Thành viên Vàng
          </span>
        </div>
      </div>

      <hr className="border-surface-variant" />

      <nav className="flex flex-col p-stack-md gap-1">
        {navItems.map((item) => {
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-stack-md px-stack-md py-stack-md rounded-lg text-left transition-all ${
                active
                  ? 'text-primary bg-primary-fixed/15 font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:translate-x-0.5'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-body-md flex-grow">{item.label}</span>
              <span
                className={`material-symbols-outlined text-[18px] transition-all ${
                  active ? 'opacity-100' : 'opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                }`}
              >
                chevron_right
              </span>
            </button>
          );
        })}

        <hr className="my-stack-sm border-surface-variant" />

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-stack-md px-stack-md py-stack-md rounded-lg text-left transition-all text-error hover:bg-error/10"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body-md text-body-md">Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
