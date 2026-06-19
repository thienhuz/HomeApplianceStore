import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CategoryMenu from './CategoryMenu';
import SearchBar from './SearchBar';

const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();
    const distinctCount = cart.distinctCount;
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    return (
        <nav className="bg-white/95 backdrop-blur-md fixed inset-x-0 top-0 z-50 border-b border-slate-200">
            <div className="w-full flex h-16 items-center justify-between gap-2 md:gap-4 px-3 md:px-8">
                {/* Left: Category Menu + Logo */}
                <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                    <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap font-bold text-[20px] text-slate-900 tracking-tight">
                        <span className="flex h-9 w-9 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                            <span className="material-symbols-outlined text-[22px] md:text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                        </span>
                        <span className="hidden lg:inline">HomeApplianceStore</span>
                    </Link>

                    <CategoryMenu />
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl min-w-0">
                    <SearchBar />
                </div>

                {/* Right: Actions */}
                <div className="flex flex-shrink-0 items-center justify-end gap-1 md:gap-4">
                    <Link
                        to="/products"
                        className="hidden xl:inline-flex items-center font-medium text-slate-600 hover:text-primary transition-colors duration-200 whitespace-nowrap"
                    >
                        Khuyến Mãi
                    </Link>

                    <Link to="/cart" className="relative inline-flex items-center justify-center p-2 text-slate-600 hover:text-primary transition-colors duration-200">
                        <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
                        {distinctCount > 0 && (
                            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                                {distinctCount > 99 ? '99+' : distinctCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated && user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setAccountMenuOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-full md:border border-slate-200 bg-white p-2 md:px-4 md:py-2 text-slate-700 hover:text-primary md:hover:border-primary transition-all duration-200"
                            >
                                <span className="material-symbols-outlined text-[24px] md:text-[20px]">account_circle</span>
                                <span className="hidden sm:inline font-medium truncate max-w-[120px]">{user.fullName}</span>
                            </button>

                            {accountMenuOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-surface-variant/60 bg-white shadow-lg">
                                    <div className="px-4 py-4 border-b border-slate-100">
                                        <p className="font-medium text-sm text-slate-900 truncate">{user.fullName}</p>
                                        <p className="mt-1 text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            navigate('/profile');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px] text-slate-400">person</span>
                                        Thông tin khách hàng
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setAccountMenuOpen(false);
                                            navigate('/');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 md:gap-3">
                            <Link
                                to="/login"
                                className="hidden md:block font-medium text-sm md:text-base text-slate-600 hover:text-primary transition-colors duration-200 whitespace-nowrap"
                            >
                                Đăng Nhập
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-xl bg-primary px-3 md:px-5 py-2 md:py-2.5 text-[13px] md:text-base font-medium text-white hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap"
                            >
                                Đăng Ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNavBar;
