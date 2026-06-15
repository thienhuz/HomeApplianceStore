import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
    categoryName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categoryName }) => {
    return (
        <nav className="flex items-center gap-2 mb-stack-lg text-secondary font-body-sm text-body-sm pt-stack-md">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface font-medium">{categoryName || 'Tất cả sản phẩm'}</span>
        </nav>
    );
};

export default Breadcrumb;
