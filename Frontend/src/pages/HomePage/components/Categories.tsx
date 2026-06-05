import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-stack-md text-center">Danh Mục Nổi Bật</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-stack-md">
                <Link className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to="/category">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">kitchen</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">Tủ Lạnh</span>
                </Link>
                <Link className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to="/category">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">local_laundry_service</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">Máy Giặt</span>
                </Link>
                <Link className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to="/category">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">cooking</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">Bếp Điện</span>
                </Link>
                <Link className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to="/category">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">blender</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">Gia Dụng Nhỏ</span>
                </Link>
                <Link className="flex flex-col items-center p-stack-md bg-surface-container-lowest rounded-lg shadow-level-1 hover-lift group" to="/category">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-sm group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-3xl">ac_unit</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">Điều Hòa</span>
                </Link>
            </div>
        </section>
    );
};

export default Categories;
