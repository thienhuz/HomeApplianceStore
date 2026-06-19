import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            <div className="relative w-full h-[400px] md:h-[560px] rounded-xl overflow-hidden shadow-level-1">
                <img
                    className="w-full h-full object-cover"
                    alt="Không gian bếp hiện đại"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeRNbCTAx1Qmh2cEBP1sDBqHVuAd3kbGxDxoXWaM0QLlvHpcV5y8qBkAxnrZA3PwpnJ_nOJMAWWoDoeDx7X4B_ccKIMn8LUPFDXiAQG_zGaAqzFtNryW3OmzffYkCGgvFvQPymWdyXvbC_lrYsE1jlaKoYo6ZYgBHc9wR2MtJTyVcsMt_NP-5SbWUMQYhy3KVu-LUMj0B7FVAu2j6LI-kxKrfhkGWQpfqDMj2k6CMR3aELGLA_NbeY8ngYxD_57_lE3uWfphQb-A"
                />
                {/* Lớp phủ tối mượt từ trái sang để chữ nổi rõ */}
                <div className="absolute inset-0 bg-gradient-to-r from-on-surface/85 via-on-surface/40 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8 md:p-16">
                    <div className="max-w-xl">
                        <span className="inline-block font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-fixed-dim mb-4">
                            Bộ sưu tập 2025
                        </span>
                        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white leading-tight mb-4">
                            Không Gian Sống Hoàn Mỹ
                        </h1>
                        <p className="font-body-lg text-body-lg text-white/80 leading-relaxed mb-8 max-w-md">
                            Nâng tầm tiện nghi gia đình với bộ sưu tập thiết bị điện máy cao cấp thế hệ mới.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg shadow-level-1 hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-in-out"
                        >
                            Mua Ngay
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
