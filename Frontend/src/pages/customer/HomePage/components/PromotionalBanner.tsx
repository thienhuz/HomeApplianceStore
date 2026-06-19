import React from 'react';
import { Link } from 'react-router-dom';

const PromotionalBanner: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            {/* Panel tối sang trọng thay cho nền teal vô tri */}
            <div className="w-full bg-on-surface text-white rounded-xl overflow-hidden shadow-level-1 flex flex-col md:flex-row">
                <div className="p-8 md:p-16 flex flex-col justify-center flex-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-fixed-dim mb-4">
                        Ưu Đãi Đặc Biệt
                    </span>
                    <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-tight mb-4">
                        Mùa Hè Sôi Động
                    </h2>
                    <p className="font-body-lg text-body-lg text-white/70 leading-relaxed mb-8 max-w-md">
                        Giảm giá lên đến 40% cho các thiết bị làm mát và tủ lạnh. Nâng cấp ngay không gian sống của bạn.
                    </p>
                    <Link
                        to="/products"
                        className="self-start inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-in-out"
                    >
                        Khám Phá Ngay
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </Link>
                </div>
                <div className="flex-1 min-h-[280px] relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Thiết bị nhà bếp khuyến mãi"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7hvvai2Klil7yyMHeuiTVgfUpKcyBvx0XbDp8ft3L901wv4FnoSBoCrUFp2Rf4EPzr6skyV7w5nz47qeyXxBco5VlbOXsmBC6W_DNpPbF6yGrxyDOZPJ3NNn_E779uDu1DWiX6Lu3UDXXwFMA150YKKDgxayr86LHxvFE-G2zz5ywWqTYU6s23oMkk-TIxrEv01a0JmhmvJuOgmF5j76AiHdEQm7R1oB6oF5wu1NJBXrdDAZGFPi5YDhHKz3ltWY7lmisg_2-xg"
                    />
                </div>
            </div>
        </section>
    );
};

export default PromotionalBanner;
