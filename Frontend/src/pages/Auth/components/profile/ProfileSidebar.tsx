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

const getButtonClass = (active: boolean) =>
  `flex items-center gap-stack-md px-stack-lg py-stack-md text-left transition-all ${
    active
      ? 'text-primary bg-primary-fixed/10 border-l-4 border-primary'
      : 'text-on-surface-variant hover:bg-surface-container'
  }`;

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  activeTab,
  onChangeTab,
  onLogout,
  onNavigateOrders,
}) => (
  <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)] overflow-hidden border border-outline-variant/10">
    <div className="p-stack-lg border-b border-surface-variant flex items-center gap-stack-md">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container flex items-center justify-center text-primary text-lg font-semibold">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={user.fullName} className="h-full w-full object-cover" />
        ) : (
          <span>{user.fullName.split(' ').map((part) => part[0]?.toUpperCase()).slice(0, 2).join('')}</span>
        )}
      </div>
      <div>
        <p className="font-label-md text-label-md text-on-surface">{user.fullName}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Thành viên Vàng</p>
      </div>
    </div>

    <nav className="flex flex-col py-stack-md">
      <button
        type="button"
        onClick={() => onChangeTab('personal-info')}
        className={getButtonClass(activeTab === 'personal-info')}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-body-md text-body-md">Thông tin cá nhân</span>
      </button>
      <button
        type="button"
        onClick={() => onChangeTab('addresses')}
        className={getButtonClass(activeTab === 'addresses')}
      >
        <span className="material-symbols-outlined">location_on</span>
        <span className="font-body-md text-body-md">Quản lý địa chỉ</span>
      </button>
      <button
        type="button"
        onClick={() => onChangeTab('password')}
        className={getButtonClass(activeTab === 'password')}
      >
        <span className="material-symbols-outlined">lock</span>
        <span className="font-body-md text-body-md">Đổi mật khẩu</span>
      </button>
      <button
        type="button"
        onClick={onNavigateOrders}
        className={getButtonClass(activeTab === 'orders')}
      >
        <span className="material-symbols-outlined" style={activeTab === 'orders' ? { fontVariationSettings: "'FILL' 1" } : undefined}>shopping_bag</span>
        <span className="font-body-md text-body-md">Đơn hàng của tôi</span>
      </button>
      <hr className="my-stack-sm border-surface-variant" />
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-stack-md px-stack-lg py-stack-md text-left transition-all text-error hover:bg-error/10"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="font-body-md text-body-md">Đăng xuất</span>
      </button>
    </nav>
  </div>
);

export default ProfileSidebar;
