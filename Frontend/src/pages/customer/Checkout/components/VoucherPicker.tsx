import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { VoucherDto } from '../../../../types';
import { voucherApi } from '../../../../services/voucherApi';

interface VoucherPickerProps {
    subtotal: number;
    selectedVoucher: VoucherDto | null;
    onSelect: (voucher: VoucherDto | null) => void;
}

const formatVnd = (amount: number) => amount.toLocaleString('vi-VN') + '₫';

const formatExpiry = (dateStr: string) => {
    const d = new Date(dateStr);
    return `HSD: ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
};

const VoucherPicker: React.FC<VoucherPickerProps> = ({ subtotal, selectedVoucher, onSelect }) => {
    const [inputValue, setInputValue] = useState(selectedVoucher?.voucherCode ?? '');
    const [isOpen, setIsOpen] = useState(false);
    const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchVouchers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await voucherApi.getAvailableVouchers(subtotal);
            setVouchers(data);
        } catch {
            setError('Không thể tải danh sách voucher.');
        } finally {
            setLoading(false);
        }
    }, [subtotal]);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFocus = () => {
        setIsOpen(true);
        if (vouchers.length === 0) fetchVouchers();
    };

    const handleSelect = (voucher: VoucherDto) => {
        onSelect(voucher);
        setInputValue(voucher.voucherCode);
        setIsOpen(false);
    };

    const handleClear = () => {
        onSelect(null);
        setInputValue('');
        setIsOpen(false);
    };

    const handleApplyManual = () => {
        if (!inputValue.trim()) return;
        const found = vouchers.find(v => v.voucherCode.toUpperCase() === inputValue.trim().toUpperCase());
        if (found) {
            handleSelect(found);
        } else {
            setError('Mã voucher không hợp lệ hoặc không áp dụng được cho đơn hàng này.');
        }
    };

    const filteredVouchers = vouchers.filter(v =>
        inputValue ? v.voucherCode.toUpperCase().includes(inputValue.toUpperCase()) : true
    );

    return (
        <div ref={containerRef} className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">Mã giảm giá</label>

            {/* Input row */}
            <div className={`flex items-center rounded-xl ring-1 transition-all ${isOpen ? 'ring-primary ring-2' : 'ring-slate-200'} bg-white overflow-hidden`}>
                <span className="material-symbols-outlined text-[18px] text-slate-400 ml-4 flex-shrink-0">confirmation_number</span>
                <input
                    type="text"
                    placeholder="Nhập hoặc chọn mã voucher"
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value);
                        setError(null);
                        if (!isOpen) setIsOpen(true);
                        if (selectedVoucher) onSelect(null);
                    }}
                    onFocus={handleFocus}
                    className="flex-grow px-3 py-3 text-sm outline-none bg-transparent placeholder:text-slate-400"
                />
                {selectedVoucher ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="mr-2 flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                        title="Bỏ voucher"
                    >
                        <span className="material-symbols-outlined text-[16px] text-slate-500">close</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleApplyManual}
                        className="mr-2 flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                        Áp dụng
                    </button>
                )}
            </div>

            {/* Applied voucher badge */}
            {selectedVoucher && (
                <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200/60">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                    <span className="text-sm text-emerald-700 font-medium flex-grow">
                        Giảm{' '}
                        {selectedVoucher.discountType === 'percent'
                            ? `${selectedVoucher.discountAmount}%`
                            : formatVnd(selectedVoucher.discountAmount)}
                        {selectedVoucher.maxDiscount && selectedVoucher.discountType === 'percent'
                            ? ` (tối đa ${formatVnd(selectedVoucher.maxDiscount)})`
                            : ''}
                    </span>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                </p>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="py-6 flex justify-center">
                            <div className="w-5 h-5 border-2 border-slate-200 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : filteredVouchers.length === 0 ? (
                        <div className="py-6 text-center text-sm text-slate-400">
                            {vouchers.length === 0 ? 'Không có voucher nào khả dụng' : 'Không tìm thấy voucher phù hợp'}
                        </div>
                    ) : (
                        <ul className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                            {filteredVouchers.map(v => {
                                const isSelected = selectedVoucher?.voucherId === v.voucherId;
                                return (
                                    <li key={v.voucherId}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(v)}
                                            className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3 ${isSelected ? 'bg-primary/5' : ''}`}
                                        >
                                            <span className={`material-symbols-outlined text-[20px] mt-0.5 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-amber-500'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                                confirmation_number
                                            </span>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-sm font-semibold text-slate-900 font-mono">{v.voucherCode}</span>
                                                    {isSelected && (
                                                        <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">Đang dùng</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-600">
                                                    Giảm{' '}
                                                    <span className="font-medium text-emerald-600">
                                                        {v.discountType === 'percent'
                                                            ? `${v.discountAmount}%`
                                                            : formatVnd(v.discountAmount)}
                                                        {v.maxDiscount && v.discountType === 'percent' ? ` (tối đa ${formatVnd(v.maxDiscount)})` : ''}
                                                    </span>
                                                    {v.minOrderValue ? ` — Đơn từ ${formatVnd(v.minOrderValue)}` : ''}
                                                </p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{formatExpiry(v.expiryDate)}</p>
                                            </div>
                                            {isSelected && (
                                                <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0 mt-0.5">check</span>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default VoucherPicker;
