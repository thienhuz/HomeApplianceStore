import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CategoryMenu from './CategoryMenu';
import SearchBar from './SearchBar';

const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    return (
        <nav className="bg-surface/95 backdrop-blur-xl fixed inset-x-0 top-0 z-50 border-b border-surface-variant/30 shadow-sm">
            <div className="w-full flex h-16 items-center gap-4 px-margin-mobile md:px-margin-desktop">
                <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap font-headline-md text-headline-md font-bold text-primary">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                    </span>
                    <span className="hidden sm:inline">HomeApplianceStore</span>
                </Link>

                <div className="hidden lg:block">
                    <CategoryMenu />
                </div>


                <div className="flex flex-1 items-center justify-end gap-3">
                    <div className="hidden md:block flex-1 max-w-2xl">
                        <SearchBar />
                    </div>

                    <Link
                        to="/products"
                        className="hidden lg:inline-flex items-center rounded-full border border-surface-variant bg-surface px-4 py-2 text-label-md text-secondary hover:border-primary hover:text-primary transition-all"
                    >
                        Khuyến Mãi
                    </Link>

                    <Link to="/cart" className="relative p-2 text-secondary hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">3</span>
                    </Link>

                    {isAuthenticated && user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setAccountMenuOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-full border border-surface-variant/70 bg-surface px-4 py-2 text-secondary hover:border-primary hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined">account_circle</span>
                                <span className="hidden sm:inline truncate max-w-[120px]">{user.fullName}</span>
                            </button>

                            {accountMenuOpen && (
                                <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-[28px] border border-surface-variant/70 bg-surface-container-lowest shadow-2xl">
                                    <div className="px-5 py-4 border-b border-surface-variant/60">
                                        <p className="font-label-md text-label-md text-on-surface">{user.fullName}</p>
                                        <p className="mt-1 text-sm text-on-surface-variant truncate">{user.email}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            navigate('/profile');
                                        }}
                                        className="w-full px-5 py-3 text-left text-on-surface hover:bg-surface-container transition-colors"
                                    >
                                        Xem thông tin khách hàng
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setAccountMenuOpen(false);
                                            navigate('/');
                                        }}
                                        className="w-full px-5 py-3 text-left text-error hover:bg-surface-container transition-colors"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                            >
                                Đăng Nhập
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-full bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm transition-all hover:bg-primary/90"
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
