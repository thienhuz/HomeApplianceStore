import React from 'react';

const HeroBanner: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-level-1">
                <img className="w-full h-full object-cover" alt="Hero Banner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeRNbCTAx1Qmh2cEBP1sDBqHVuAd3kbGxDxoXWaM0QLlvHpcV5y8qBkAxnrZA3PwpnJ_nOJMAWWoDoeDx7X4B_ccKIMn8LUPFDXiAQG_zGaAqzFtNryW3OmzffYkCGgvFvQPymWdyXvbC_lrYsE1jlaKoYo6ZYgBHc9wR2MtJTyVcsMt_NP-5SbWUMQYhy3KVu-LUMj0B7FVAu2j6LI-kxKrfhkGWQpfqDMj2k6CMR3aELGLA_NbeY8ngYxD_57_lE3uWfphQb-A" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-on-surface/80 to-transparent flex items-center p-8 md:p-16">
                    <div className="max-w-xl text-surface-container-lowest">
                        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-md">Không Gian Sống Hoàn Mỹ</h1>
                        <p className="font-body-lg text-body-lg mb-stack-lg opacity-90">Nâng tầm tiện nghi gia đình với bộ sưu tập thiết bị điện máy cao cấp thế hệ mới.</p>
                        <button className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-lg hover:bg-surface-tint transition-colors shadow-level-1">Mua Ngay</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
