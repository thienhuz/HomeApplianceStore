import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-50 w-full mt-16 border-t border-slate-200">
            <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-xl font-bold text-slate-900 mb-4 tracking-tight">HomeApplianceStore</div>
                    <p className="text-slate-500 leading-relaxed text-sm">Mang đến sự tiện nghi và hiện đại cho ngôi nhà của bạn bằng những sản phẩm điện máy chất lượng cao.</p>
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                    <span className="font-semibold text-slate-900 mb-2">Chính Sách</span>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Chính sách vận chuyển</Link>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Chính sách đổi trả</Link>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Chính sách bảo mật</Link>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Điều khoản dịch vụ</Link>
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                    <span className="font-semibold text-slate-900 mb-2">Thông Tin</span>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Về chúng tôi</Link>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Liên hệ hỗ trợ</Link>
                    <Link className="text-slate-500 hover:text-primary transition-colors text-sm" to="#">Câu hỏi thường gặp (FAQ)</Link>
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                    <span className="font-semibold text-slate-900 mb-2">Liên Hệ</span>
                    <div className="flex items-start gap-3 text-slate-500 text-sm leading-relaxed">
                        <span className="material-symbols-outlined text-[20px] text-slate-400 mt-0.5">location_on</span>
                        <span>123 Đường Nguyễn Văn Linh,<br />Quận 7, TP.HCM</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm mt-1">
                        <span className="material-symbols-outlined text-[20px] text-slate-400">call</span>
                        <span>1900 1234</span>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 border-t border-slate-200 mt-8 pt-8 text-center text-slate-400 text-sm">
                    © 2026 HomeApplianceStore. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
