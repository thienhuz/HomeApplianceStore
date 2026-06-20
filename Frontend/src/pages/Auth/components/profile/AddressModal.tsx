import React, { useState, useEffect } from 'react';
import { getProvinces } from '../../../../services/addressService';
import type { UserAddress, Province } from '../../../../types';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserAddress) => void;
  initialData?: UserAddress | null;
  user?: { fullName?: string, phone?: string };
}

const AddressModal = ({ isOpen, onClose, onSubmit, initialData, user }: AddressModalProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    getProvinces().then(setProvinces).catch(console.error);
  }, []);

  const [formData, setFormData] = useState<UserAddress>({
    receiverName: user?.fullName || '',
    phone: user?.phone || '',
    province: '',
    district: '',
    ward: '',
    addressDetail: '',
    type: 'home',
    isDefault: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        receiverName: user?.fullName || '',
        phone: user?.phone || '',
        province: '',
        district: '',
        ward: '',
        addressDetail: '',
        type: 'home',
        isDefault: false
      });
    }
  }, [initialData, isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1.5 px-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Body */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            
            {/* Row 1: Full Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={labelClasses}>Họ và tên người nhận</label>
                <input 
                  type="text"
                  required
                  placeholder="Nhập họ và tên"
                  className={inputClasses}
                  value={formData.receiverName}
                  onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClasses}>Số điện thoại</label>
                <input 
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Row 2: City, District, Ward */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className={labelClasses}>Tỉnh/Thành phố</label>
                <div className="relative">
                  <select 
                    required
                    className={inputClasses}
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                  >
                    <option value="" disabled>Chọn Tỉnh/Thành</option>
                    {provinces.map(p => (
                      <option key={p.provinceId} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelClasses}>Quận/Huyện</label>
                <input 
                  type="text"
                  required
                  placeholder="Nhập Quận/Huyện"
                  className={inputClasses}
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClasses}>Phường/Xã</label>
                <input 
                  type="text"
                  required
                  placeholder="Nhập Phường/Xã"
                  className={inputClasses}
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                />
              </div>
            </div>

            {/* Row 3: Detail Address */}
            <div className="space-y-1">
              <label className={labelClasses}>Địa chỉ cụ thể</label>
              <textarea 
                rows={3}
                required
                placeholder="Số nhà, tên đường, tòa nhà..."
                className={`${inputClasses} resize-none`}
                value={formData.addressDetail}
                onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
              />
            </div>

            {/* Row 4: Address Type */}
            <div className="space-y-3">
              <label className={labelClasses}>Loại địa chỉ</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'home'})}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border transition-all ${
                    formData.type === 'home' 
                    ? 'border-primary text-primary bg-primary/5 ring-1 ring-primary font-semibold' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Nhà riêng</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'office'})}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border transition-all ${
                    formData.type === 'office' 
                    ? 'border-primary text-primary bg-primary/5 ring-1 ring-primary font-semibold' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">domain</span>
                  <span>Văn phòng</span>
                </button>
              </div>
            </div>

            {/* Row 5: Default Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group w-max">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${formData.isDefault ? 'bg-primary' : 'bg-slate-200'}`} />
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${formData.isDefault ? 'translate-x-5' : ''}`} />
                </div>
                <span className="text-sm font-medium text-slate-700 select-none">Đặt làm địa chỉ mặc định</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50/50">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Trở lại
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
