import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
    return (
        <nav className="flex items-center gap-2 mb-stack-lg text-secondary font-body-sm text-body-sm">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface font-medium">Tủ Lạnh</span>
        </nav>
    );
};

export default Breadcrumb;
