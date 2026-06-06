import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const handleSearch = () => {
        const keyword = searchQuery.trim();
        if (keyword) {
            navigate(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <nav className="bg-surface/95 backdrop-blur-xl fixed inset-x-0 top-0 z-50 border-b border-surface-variant/30 shadow-sm">
            <div className="w-full flex h-20 items-center gap-4 px-margin-mobile md:px-margin-desktop">
                <Link to="/" className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap">
                    HomeApplianceStore
                </Link>

                <div className="hidden lg:flex items-center gap-6">
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" to="/category">Tủ Lạnh</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" to="/category">Bếp Nấu</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" to="/category">Máy Giặt</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" to="/category">Gia Dụng Nhỏ</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" to="/category">Máy Rửa Chén</Link>
                </div>


                <div className="flex flex-1 items-center justify-end gap-3">
                    <form
                        className="hidden md:flex flex-1 max-w-2xl items-center overflow-hidden rounded-full border border-surface-variant bg-surface-bright shadow-sm"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSearch();
                        }}
                    >
                        <button type="submit" className="flex h-full items-center justify-center px-4 text-primary">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
                            type="text"
                        />
                    </form>

                    <Link
                        to="/category"
                        className="hidden lg:inline-flex items-center rounded-full border border-surface-variant bg-surface px-4 py-2 text-label-md text-secondary hover:border-primary hover:text-primary transition-all"
                    >
                        Khuyến Mãi
                    </Link>

                    <button className="relative p-2 text-secondary hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">3</span>
                    </button>

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
