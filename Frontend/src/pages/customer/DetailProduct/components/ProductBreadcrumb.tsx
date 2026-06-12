import React from 'react';
import { Link } from 'react-router-dom';

interface ProductBreadcrumbProps {
  title: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ title }) => (
  <nav className="mb-stack-lg flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
    <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
    <Link className="hover:text-primary transition-colors" to="/category">Tủ lạnh</Link>
    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
    <span className="text-on-surface font-medium truncate">{title}</span>
  </nav>
);

export default ProductBreadcrumb;
