import React from 'react';

const PromotionalBanner: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <div className="w-full bg-tertiary-container text-on-tertiary-container rounded-xl overflow-hidden shadow-level-1 flex flex-col md:flex-row">
                <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest mb-2 opacity-80">Ưu Đãi Đặc Biệt</span>
                    <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4">Mùa Hè Sôi Động</h2>
                    <p className="font-body-lg text-body-lg mb-6 opacity-90">Giảm giá lên đến 40% cho các thiết bị làm mát và tủ lạnh. Nâng cấp ngay không gian sống của bạn.</p>
                    <button className="self-start bg-on-tertiary-container text-tertiary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-surface-container-lowest transition-colors">Khám Phá Ngay</button>
                </div>
                <div className="flex-1 bg-surface-container-low min-h-[300px] relative">
                    <img className="absolute inset-0 w-full h-full object-cover" alt="Promotional Banner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7hvvai2Klil7yyMHeuiTVgfUpKcyBvx0XbDp8ft3L901wv4FnoSBoCrUFp2Rf4EPzr6skyV7w5nz47qeyXxBco5VlbOXsmBC6W_DNpPbF6yGrxyDOZPJ3NNn_E779uDu1DWiX6Lu3UDXXwFMA150YKKDgxayr86LHxvFE-G2zz5ywWqTYU6s23oMkk-TIxrEv01a0JmhmvJuOgmF5j76AiHdEQm7R1oB6oF5wu1NJBXrdDAZGFPi5YDhHKz3ltWY7lmisg_2-xg" />
                </div>
            </div>
        </section>
    );
};

export default PromotionalBanner;
