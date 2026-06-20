import React, { useState, useEffect } from 'react';
import type { AuthUser } from '../../../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  // Trong thực tế sẽ cần onSave hoặc dùng API trực tiếp
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || ''
  });

  const [avatar, setAvatar] = useState(user.imageUrl || 'https://placehold.co/200x200/f1f5f9/94a3b8?text=Avatar');

  // Sync state if user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: user.fullName || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || ''
      });
      setAvatar(user.imageUrl || 'https://placehold.co/200x200/f1f5f9/94a3b8?text=Avatar');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Saving profile data:', formData);
    alert("Đã lưu thông tin thành công!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Chỉnh sửa thông tin cá nhân</h2>
            <p className="text-sm text-slate-500">Cập nhật thông tin để chúng tôi phục vụ bạn tốt hơn.</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-colors flex items-center justify-center"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            
            {/* Avatar Upload Section */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img 
                  src={avatar} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-100"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_camera</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatar(URL.createObjectURL(file));
                  }} />
                </label>
              </div>
              <div className="space-y-1">
                <button 
                  type="button"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Thay đổi ảnh
                </button>
                <p className="text-xs text-slate-400">JPG, PNG hoặc GIF. Tối đa 2MB.</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 px-1">Họ và tên</label>
                <input 
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Nhập họ và tên"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 px-1">Số điện thoại</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>

              {/* Email (Disabled) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span>
                    Đã xác minh
                  </span>
                </div>
                <input 
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed opacity-80"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 px-1">Địa chỉ mặc định</label>
                <textarea 
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Nhập địa chỉ của bạn"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
