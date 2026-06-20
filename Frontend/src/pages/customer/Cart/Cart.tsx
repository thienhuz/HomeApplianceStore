import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './components/CartItem';
import VoucherInput from './components/VoucherInput';
import CartSummary from './components/CartSummary';
import Checkbox from './components/Checkbox';
import { useCart } from '../../../context/CartContext';

const Cart: React.FC = () => {
  const { cart, loading, updateItem, removeItem } = useCart();
  const items = cart.items;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const prevIds = useRef<Set<number>>(new Set());

  // Đồng bộ lựa chọn khi giỏ thay đổi: tự chọn sản phẩm mới thêm, bỏ sản phẩm đã xóa.
  useEffect(() => {
    const currentIds = items.map((i) => i.productId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const id of next) {
        if (!currentIds.includes(id)) next.delete(id);
      }
      for (const id of currentIds) {
        if (!prevIds.current.has(id)) next.add(id);
      }
      return next;
    });
    prevIds.current = new Set(currentIds);
  }, [items]);

  const allSelected = items.length > 0 && selectedIds.size === items.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(items.map((i) => i.productId)));
  };

  const toggleItem = (productId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const removeSelected = async () => {
    for (const id of selectedIds) {
      // eslint-disable-next-line no-await-in-loop
      await removeItem(id);
    }
  };

  const { selectedCount, subtotal } = useMemo(() => {
    const chosen = items.filter((i) => selectedIds.has(i.productId));
    return {
      selectedCount: chosen.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: chosen.reduce((sum, i) => sum + i.lineTotal, 0),
    };
  }, [items, selectedIds]);

  return (
    <div className="pb-16 pt-8 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Giỏ hàng của bạn</h1>
        <p className="text-base text-slate-500">
          Bạn đang có <span className="font-semibold text-primary">{cart.totalQuantity}</span> sản phẩm trong giỏ hàng
        </p>
      </div>

      {loading && items.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-50 border border-slate-100 rounded-3xl">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
            <span className="material-symbols-outlined text-5xl text-slate-300">remove_shopping_cart</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng trống</p>
          <p className="text-slate-500 mb-8 max-w-sm">Chưa có sản phẩm nào trong giỏ hàng của bạn. Khám phá các ưu đãi ngay hôm nay!</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined">storefront</span>
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Danh sách sản phẩm */}
          <div className="flex-grow space-y-4">
            {/* Thanh chọn tất cả */}
            <div className="bg-white rounded-2xl px-6 py-4 flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-3">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} ariaLabel="Chọn tất cả" />
                <button type="button" onClick={toggleAll} className="font-semibold text-sm text-slate-900">
                  Chọn tất cả ({items.length})
                </button>
              </div>
              {selectedIds.size > 0 && (
                <button
                  type="button"
                  onClick={removeSelected}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors font-semibold text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Xóa đã chọn ({selectedIds.size})
                </button>
              )}
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  selected={selectedIds.has(item.productId)}
                  onToggle={toggleItem}
                  onQuantityChange={updateItem}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Sidebar tóm tắt (sticky) */}
          <aside className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              <VoucherInput />
              <CartSummary selectedCount={selectedCount} subtotal={subtotal} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
