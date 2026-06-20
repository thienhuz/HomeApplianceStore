export interface UserAddress {
  addressId?: number;
  userId?: number;
  receiverName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  type?: 'home' | 'office';
  isDefault: boolean;
  createdAt?: string;
}

export interface Province {
  provinceId: number;
  code?: string;
  name: string;
}
