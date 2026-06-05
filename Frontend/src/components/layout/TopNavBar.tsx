import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-surface-variant/20 shadow-sm">
            <div className="max-w-container-max mx-auto flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20">
                {/* Brand */}
                <Link className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap" to="/">
                    HomeApplianceStore
                </Link>
                
                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md mx-stack-lg relative shadow-level-1 rounded-lg">
                    <button
                        aria-label="search"
                        onClick={() => {
                            if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                        type="button"
                    >
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const q = searchQuery.trim();
                                if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                            }
                        }}
                        className="w-full bg-surface-bright border border-surface-variant rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-on-surface font-body-sm text-body-sm"
                        placeholder="Tìm kiếm sản phẩm..."
                        type="text"
                    />
                </div>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-gutter ml-auto">
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95 duration-200" to="/category">Tủ Lạnh</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95 duration-200" to="/category">Bếp Nấu</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95 duration-200" to="/category">Máy Giặt</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95 duration-200" to="/category">Gia Dụng Nhỏ</Link>
                    <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95 duration-200" to="/category">Máy Rửa Chén</Link>
                    <Link className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1 active:scale-95 duration-200" to="/category">Khuyến Mãi</Link>
                </div>
                
                {/* Trailing Icons */}
                <div className="flex items-center gap-stack-md ml-auto md:ml-0">
                    <button className="relative p-2 text-secondary hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary-container rounded-full"></span>
                    </button>
                    <button className="p-2 text-secondary hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavBar;
