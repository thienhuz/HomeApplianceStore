import React from 'react';
import { Link } from 'react-router-dom';

interface ProductBreadcrumbProps {
  title: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ title }) => (
  <nav className="flex items-center gap-1.5 text-sm text-slate-500 pt-4 mb-6">
    <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
    <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
    <Link className="hover:text-primary transition-colors" to="/products">Sản phẩm</Link>
    <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
    <span className="text-slate-900 font-medium truncate max-w-xs">{title}</span>
  </nav>
);

export default ProductBreadcrumb;
