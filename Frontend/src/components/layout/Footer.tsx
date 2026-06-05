import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-surface-container-low w-full mt-stack-lg">
            <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg">
                <div className="col-span-1 md:col-span-1">
                    <div className="font-headline-md text-headline-md font-bold text-on-surface mb-stack-sm">HomeApplianceStore</div>
                    <p className="text-on-secondary-container mt-2">Mang đến sự tiện nghi và hiện đại cho ngôi nhà của bạn bằng những sản phẩm điện máy chất lượng cao.</p>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                    <span className="font-label-md text-label-md text-on-surface font-bold mb-2">Chính Sách</span>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">Shipping Policy</Link>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">Returns</Link>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">Privacy Policy</Link>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">Terms of Service</Link>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                    <span className="font-label-md text-label-md text-on-surface font-bold mb-2">Thông Tin</span>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">About Us</Link>
                    <Link className="text-on-secondary-container hover:text-primary transition-colors underline cursor-pointer" to="#">Contact</Link>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                    <span className="font-label-md text-label-md text-on-surface font-bold mb-2">Liên Hệ</span>
                    <div className="flex items-center gap-2 text-on-secondary-container">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-secondary-container mt-2">
                        <span className="material-symbols-outlined">call</span>
                        <span>1900 1234</span>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 border-t border-surface-variant/20 mt-stack-md pt-stack-md text-center text-on-secondary-container">
                    © 2024 HomeApplianceStore. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
