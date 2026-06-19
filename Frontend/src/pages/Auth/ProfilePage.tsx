import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ProfileAddresses,
  ProfilePasswordSection,
  ProfilePersonalInfo,
  ProfileSidebar,
  type ProfileTabKey,
} from './components/profile';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('personal-info');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const initials = useMemo(() => {
    if (!user?.fullName) return '';
    return user.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }, [user]);

  const memberSinceLabel = useMemo(() => {
    if (!user?.createdAt) return '';
    return new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt));
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigateOrders = () => {
    navigate('/orders');
  };

  if (!user) return null;

  return (
    <main className="max-w-container-max mx-auto px-6 md:px-8 py-8">
      {/* Breadcrumb + page heading */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
        <button type="button" onClick={() => navigate('/')} className="hover:text-primary transition-colors">
          Trang chủ
        </button>
        <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
        <span className="text-slate-900 font-medium">Tài khoản của tôi</span>
      </nav>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Tài khoản của tôi</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <aside className="w-full md:w-80 flex-shrink-0">
          <ProfileSidebar
            user={user}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onLogout={handleLogout}
            onNavigateOrders={handleNavigateOrders}
          />
        </aside>

        <section className="flex-grow">
          {activeTab === 'personal-info' && (
            <ProfilePersonalInfo
              user={user}
              initials={initials}
              memberSinceLabel={memberSinceLabel}
              onEdit={() => undefined}
            />
          )}
          {activeTab === 'addresses' && <ProfileAddresses user={user} />}
          {activeTab === 'password' && <ProfilePasswordSection />}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
