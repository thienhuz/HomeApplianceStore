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
    <div className="pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg mb-2">Giỏ hàng của bạn</h1>
        <p className="font-body-md text-body-md text-secondary">
          Bạn đang có {cart.totalQuantity} sản phẩm trong giỏ hàng
        </p>
      </div>

      {loading && items.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(31,41,55,0.04)]">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">remove_shopping_cart</span>
          <p className="font-headline-md text-headline-md mb-2">Giỏ hàng của bạn đang trống</p>
          <p className="font-body-md text-body-md text-secondary mb-6">Hãy thêm sản phẩm để bắt đầu mua sắm.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined">storefront</span>
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Danh sách sản phẩm */}
          <div className="flex-grow space-y-gutter">
            {/* Thanh chọn tất cả */}
            <div className="bg-surface-container-lowest rounded-xl px-5 py-4 flex items-center justify-between shadow-[0_4px_20px_rgba(31,41,55,0.04)]">
              <div className="flex items-center gap-3">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} ariaLabel="Chọn tất cả" />
                <button type="button" onClick={toggleAll} className="font-label-md text-label-md text-on-surface">
                  Chọn tất cả ({items.length})
                </button>
              </div>
              {selectedIds.size > 0 && (
                <button
                  type="button"
                  onClick={removeSelected}
                  className="inline-flex items-center gap-1 text-secondary hover:text-error transition-colors font-label-md text-label-md"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                  Xóa đã chọn ({selectedIds.size})
                </button>
              )}
            </div>

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

            <div className="pt-stack-md">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label-md text-label-md"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Sidebar tóm tắt (sticky) */}
          <aside className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-28 space-y-gutter">
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
