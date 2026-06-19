import React from 'react';

const DeliveryAddress: React.FC = () => {
    return (
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl checkout-shadow">
            <div className="flex justify-between items-center mb-stack-md">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <h2 className="font-headline-md text-headline-md">Địa chỉ giao hàng</h2>
                </div>
                <button className="text-primary font-label-md hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add_circle</span> Thêm địa chỉ mới
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                {/* Address Card 1 (Default) */}
                <div className="border-2 border-primary p-stack-md rounded-lg relative cursor-pointer group bg-primary/5 transition-all">
                    <div className="absolute top-2 right-2">
                        <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">MẶC ĐỊNH</span>
                    </div>
                    <p className="font-bold font-body-md mb-1">Nguyễn Văn An</p>
                    <p className="text-secondary font-body-sm mb-1">090 123 4567</p>
                    <p className="text-secondary font-body-sm">123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</p>
                </div>
                {/* Address Card 2 */}
                <div className="border border-outline-variant p-stack-md rounded-lg cursor-pointer hover:border-primary/50 transition-all group">
                    <p className="font-bold font-body-md mb-1">Nguyễn Văn An (Văn phòng)</p>
                    <p className="text-secondary font-body-sm mb-1">090 123 4567</p>
                    <p className="text-secondary font-body-sm">456 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                    <button className="mt-stack-sm text-primary font-label-sm opacity-0 group-hover:opacity-100 transition-opacity">Chọn làm mặc định</button>
                </div>
            </div>
        </section>
    );
};

export default DeliveryAddress;
