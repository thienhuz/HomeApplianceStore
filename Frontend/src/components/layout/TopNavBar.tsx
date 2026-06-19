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
            <div className="w-full flex h-16 items-center gap-6 px-margin-mobile md:px-margin-desktop">
                <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap font-bold text-[20px] text-slate-900 tracking-tight">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                    </span>
                    <span className="hidden sm:inline">HomeApplianceStore</span>
                </Link>

                <div className="hidden lg:block">
                    <CategoryMenu />
                </div>

                <div className="flex flex-1 items-center justify-end gap-4">
                    <div className="hidden md:block flex-1 max-w-2xl">
                        <SearchBar />
                    </div>

                    <Link
                        to="/products"
                        className="hidden lg:inline-flex items-center font-medium text-slate-600 hover:text-primary transition-colors duration-200"
                    >
                        Khuyến Mãi
                    </Link>

                    <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary transition-colors duration-200">
                        <span className="material-symbols-outlined">shopping_cart</span>
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
                                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:border-primary hover:text-primary transition-all duration-200"
                            >
                                <span className="material-symbols-outlined">account_circle</span>
                                <span className="hidden sm:inline font-medium truncate max-w-[120px]">{user.fullName}</span>
                            </button>

                            {accountMenuOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-surface-variant/60 bg-surface-container-lowest shadow-level-2">
                                    <div className="px-4 py-4 border-b border-surface-variant/50">
                                        <p className="font-label-md text-label-md text-on-surface truncate">{user.fullName}</p>
                                        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant truncate">{user.email}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            navigate('/profile');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left font-body-md text-body-md text-on-surface hover:bg-surface-container transition-colors duration-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
                                        Thông tin khách hàng
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setAccountMenuOpen(false);
                                            navigate('/');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left font-body-md text-body-md text-error hover:bg-error/5 transition-colors duration-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="font-medium text-slate-600 hover:text-primary transition-colors duration-200"
                            >
                                Đăng Nhập
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary/90 transition-colors duration-200"
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
