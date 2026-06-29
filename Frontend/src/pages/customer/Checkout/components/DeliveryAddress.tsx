import React from 'react';
import type { UserAddress } from '../../../../types';

interface DeliveryAddressProps {
    addresses: UserAddress[];
    selectedAddressId: number | null;
    onSelect: (id: number) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ addresses, selectedAddressId, onSelect }) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-100">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    <h2 className="text-lg font-semibold text-slate-800">Địa chỉ giao hàng</h2>
                </div>
                <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1.5 transition-all">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span> Thêm địa chỉ mới
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.length === 0 ? (
                    <p className="text-sm text-slate-500 py-4">Bạn chưa có địa chỉ giao hàng nào. Vui lòng thêm địa chỉ mới.</p>
                ) : (
                    addresses.map(addr => {
                        const isSelected = selectedAddressId === addr.addressId;
                        return (
                            <div 
                                key={addr.addressId}
                                onClick={() => onSelect(addr.addressId)}
                                className={`p-5 rounded-xl relative cursor-pointer transition-all shadow-sm group ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'ring-1 ring-slate-200 bg-white hover:ring-primary/40 hover:shadow'}`}
                            >
                                {addr.isDefault && (
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide">MẶC ĐỊNH</span>
                                    </div>
                                )}
                                <p className="font-semibold text-slate-800 text-base mb-1.5">
                                    {addr.receiverName} {addr.type === 'office' && <span className="text-slate-500 font-normal text-sm">(Văn phòng)</span>}
                                </p>
                                <p className="text-slate-600 text-sm mb-1.5">{addr.phone}</p>
                                <p className="text-slate-600 text-sm leading-relaxed pr-8">{addr.addressDetail}, {addr.ward}, {addr.district}, {addr.province}</p>
                                {!isSelected && (
                                    <button onClick={(e) => { e.stopPropagation(); onSelect(addr.addressId); }} className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-3">Chọn địa chỉ này</button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default DeliveryAddress;
