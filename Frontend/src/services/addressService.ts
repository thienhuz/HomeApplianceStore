import { request } from './apiClient';
import type { UserAddress, Province } from '../types';
export async function getProvinces(): Promise<Province[]> {
  return request<Province[]>('/provinces', {
    method: 'GET',
  });
}

export async function getMyAddresses(): Promise<UserAddress[]> {
  return request<UserAddress[]>('/useraddresses', {
    method: 'GET',
  });
}

export async function addAddress(data: UserAddress): Promise<UserAddress> {
  return request<UserAddress>('/useraddresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAddress(id: number, data: UserAddress): Promise<boolean> {
  return request<boolean>(`/useraddresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAddress(id: number): Promise<boolean> {
  return request<boolean>(`/useraddresses/${id}`, {
    method: 'DELETE',
  });
}

export async function setDefaultAddress(id: number): Promise<boolean> {
  return request<boolean>(`/useraddresses/${id}/default`, {
    method: 'PUT',
  });
}
