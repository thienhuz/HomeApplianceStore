import React from 'react';
import { Link } from 'react-router-dom';

const relatedProducts = [
  {
    id: '2',
    brand: 'PANASONIC',
    title: 'Tủ lạnh Panasonic Inverter 322 Lít NR-BV360QSVN',
    price: '11.200.000đ',
    oldPrice: '13.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsFQ4CJC6KCyheaWthdV--2a3MxKzdI-OzEa10kViKuz86JQEk45VfoJh1c4oOVgiiKqxQxW39HD7KtaxIUb966YlmZSO1LcJRTV0qi62A8XMY78wGPPIhc_6rTlSCp7uc4WE2g_ETGXEXgCUCaqI-61xWMAMI43E3irujHM80iSLZLOS1LLgs7TxsPM8VjG-p_5No8s5HZ85n_kd9O-LC2LhEQwjcKFym61z0irGN72nPt5-c2cGxpyUdEo6amujR6ASequvUww',
  },
  {
    id: '3',
    brand: 'SAMSUNG',
    title: 'Tủ lạnh Samsung Side by Side 600L',
    price: '28.900.000đ',
    oldPrice: '32.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMSN_-ufHlz4_fG_OViW-0ryE51ggvsnWSm_dEZeljyz13LWyvnjm1is6ZulwwKZpSOhtSII0dhjgGZjaMo5g2JkKk2qqPXgeVGIWT81od0OfH90maz1JmkkP9KP-cPJuid5fIOXHZz2q3ZAdKbM4Ka0UAKe06O_2U2NYV6zGjeI7eqXCsAyqa5X47oesXAxkAeo_IsX_26UjE1vAdweWpPlJFn_sTw_Y4fthdgZouMDiQv0SMTS8EBPdiP5R5bew_p_3Mypo7Lw',
  },
  {
    id: '4',
    brand: 'SHARP',
    title: 'Máy giặt Sharp Inverter 401 Lít SJ-FX631V-SL',
    price: '13.800.000đ',
    oldPrice: '15.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7IWxhgVMbEnff-tIw1P0HygaogNyUKtAB2TIR_v0n4vmlzFgz8GYuSQowrazBHbDuEkkBky_0WnIQCyIMxF0oxgPUPf8Nui0Dxy63ZEr0SiyKwY_IhRaXDKvSw2j6uYK9_XOml1TbmQ4GYhJq4w0IyZCGgyIs8qByJGwhdM1bZfuKIwgUukfpOGrpc_XecL9VEMZRzx0RDdn4TVYbCmDliPuIM9q9vGjrRkCxoBp57F3bgn91-NS3jXbt41ukXWUB4zAXcaOtQ',
  },
  {
    id: '5',
    brand: 'LG',
    title: 'Máy giặt LG AI DD™ 11kg FV1411S4P',
    price: '15.990.000đ',
    oldPrice: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQLkyQToZXfokx1e1j0e9xhEkbYPTt2Y7QRyOmCXY9z5XLc-TgS7FlfzC6mPevpxnRbtvMG44qsnzSkWmtC8e0nLXWGIq86foIk_qeXepJ99Cjt2H7_8asYp_1W5PomyaF0rMDiOMFGVEyPfPFHSjUAKEfaz5A30J6omRF6gY054dxYmhySjJQFiQP4UxYgLkjZMiVmVhuPCW2pnEyVSDH_IO-6w0BKiFwOTiA8rnuGuK6oTe1eI4y3R7b6iGsXd3a8jrxIDcKQ',
  },
];

const RelatedProducts: React.FC = () => {
  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline-lg text-headline-lg">Sản phẩm liên quan</h2>
        <Link className="text-primary font-label-md flex items-center hover:underline" to="/products">Xem tất cả <span className="material-symbols-outlined">chevron_right</span></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {relatedProducts.map((product) => (
          <Link key={product.id} to={`/DetailProduct/${product.id}`} className="group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="aspect-square p-4 bg-surface-container-low relative overflow-hidden">
              <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt={product.title} src={product.img} />
              <span className="absolute top-2 right-2 bg-error text-white px-2 py-1 rounded text-[12px] font-bold">-15%</span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-on-surface-variant text-[12px] font-medium mb-1">{product.brand}</p>
              <h3 className="font-body-md font-semibold text-on-surface mb-2 line-clamp-2">{product.title}</h3>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-primary font-bold">{product.price}</span>
                  {product.oldPrice && <span className="text-[12px] text-on-surface-variant line-through">{product.oldPrice}</span>}
                </div>
                <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
