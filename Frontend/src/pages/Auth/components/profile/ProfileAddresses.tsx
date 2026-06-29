import React, { useState, useEffect } from 'react';
import type { AuthUser } from '../../../../types';
import AddressModal from './AddressModal';
import { getMyAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../../../services/addressService';
import type { UserAddress } from '../../../../types';
import { toast } from 'react-toastify';

interface ProfileAddressesProps {
  user: AuthUser;
}

const ProfileAddresses: React.FC<ProfileAddressesProps> = ({ user }) => {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getMyAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Lỗi khi tải địa chỉ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (id?: number) => {
    if (!id) return;
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      try {
        await deleteAddress(id);
        await loadAddresses();
        toast.success("Xóa địa chỉ thành công");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa.");
      }
    }
  };

  const handleSetDefault = async (id?: number) => {
    if (!id) return;
    try {
      await setDefaultAddress(id);
      await loadAddresses();
      toast.success("Đã thiết lập làm địa chỉ mặc định");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thiết lập mặc định.");
    }
  };

  const handleSubmitAddress = async (data: UserAddress) => {
    try {
      if (editingAddress?.addressId) {
        await updateAddress(editingAddress.addressId, data);
        toast.success("Cập nhật địa chỉ thành công");
      } else {
        await addAddress(data);
        toast.success("Thêm địa chỉ mới thành công");
      }
      setIsModalOpen(false);
      await loadAddresses();
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Quản lý địa chỉ</h2>
          <p className="text-sm text-slate-500 mt-1">Quản lý địa chỉ nhận hàng của bạn</p>
        </div>
        <button
          onClick={handleAddAddress}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm địa chỉ mới
        </button>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="text-center text-slate-500 py-8">Đang tải địa chỉ...</div>
        ) : addresses.length === 0 ? (
          <div className="text-center text-slate-500 py-8">Bạn chưa có địa chỉ nào.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((address) => (
              <div 
                key={address.addressId} 
                className={`relative p-6 rounded-2xl transition-colors ${
                  address.isDefault 
                    ? "border-2 border-primary/20 bg-primary/[0.02] hover:border-primary/30" 
                    : "border border-slate-200 hover:border-slate-300 group"
                }`}
              >
                {address.isDefault && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl">
                    Mặc định
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {address.type === 'home' || !address.type ? (
                      <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-xl text-[20px]">home</span>
                    ) : (
                      <span className="material-symbols-outlined text-indigo-500 bg-indigo-100 p-2.5 rounded-xl text-[20px]">domain</span>
                    )}
                    <span className="text-base font-semibold text-slate-900">
                      {address.type === 'home' || !address.type ? 'Nhà riêng' : 'Văn phòng'}
                    </span>
                  </div>
                  <div className={`flex gap-1.5 ${address.isDefault ? "" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors" title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(address.addressId)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">person</span>
                    <span className="text-sm font-medium text-slate-900">{address.receiverName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">call</span>
                    <span className="text-sm text-slate-600">{address.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-slate-400 mt-0.5">location_on</span>
                    <span className="text-sm text-slate-600 leading-relaxed">
                      {address.addressDetail}, Phường {address.ward}, Quận {address.district}, TP {address.province}
                    </span>
                  </div>
                </div>

                {!address.isDefault && (
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => handleSetDefault(address.addressId)}
                      className="text-primary text-xs font-semibold uppercase tracking-wider hover:text-primary/80 transition-colors"
                    >
                      Thiết lập mặc định
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAddress}
        initialData={editingAddress}
        user={user}
      />
    </div>
  );
};

export default ProfileAddresses;
