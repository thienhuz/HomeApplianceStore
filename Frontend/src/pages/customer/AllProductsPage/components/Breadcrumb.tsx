import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
    categoryName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categoryName }) => {
    return (
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 pt-4 mb-4">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
            <span className="text-slate-900 font-medium">{categoryName || 'Tất cả sản phẩm'}</span>
        </nav>
    );
};

export default Breadcrumb;
