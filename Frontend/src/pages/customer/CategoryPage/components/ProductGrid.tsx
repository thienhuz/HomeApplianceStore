import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Product Card 1 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh Samsung Inverter 382 Lít" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC91hCMDGP7ZPCxk3wk0WbpVTl7CGnytRZMuj5U6FIroBxj0Da4oJV4AzaYcw60jYfiFUJ83EnuWbFIAfglFbzkYOyci5GeSRQd6U4JYf7eRzXp_v6wCPsefkBClKa-7pvTF50nGNlU6_XVE1yjoIS5uHW0Fd-qr37hfTspYcL1Pdf0yLf1LKp1uTTO5L-LWU4Hj65Kx1_FVNg5zxGKmMSrKGTp8lnaS8F2Qn_MlVwqhkysxWUSdCGvGtNzcpHm-wacj05HTzylwA" />
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">GIẢM 15%</div>
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">Samsung</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh Inverter Samsung 382 Lít RT38K5982BS</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">12.490.000đ</span>
                        <span className="text-secondary line-through text-body-sm">14.690.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh LG Inverter 613 Lít" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4iXzAerBlJrCLofJJ6mBmcM4P_xByBBBU8XQU_7AO8Fgb4Jt1NUJgz8UTfmeeK52V2j6VyvZzV6qcVz7kjJrpB_73Kupv13ql-QNtH9BiweGP0RfV8z3DFzL3LYkiTS4GgJCngCmfyF32zeFNtHx1AlwMvEZBG0dZrXL6TVGuvhPWAl-2YtfHvkdK3_rq4EOOyTja4Cld5hlh1DN-INMCxfPxAndOq2Q_q6n00Wajfp87v3Wc6FHvSG0zuyBI50zzWwnXSlcyFg" />
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">LG</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh LG Inverter 613 Lít GR-B247JS</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">16.990.000đ</span>
                        <span className="text-secondary line-through text-body-sm">19.500.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh Panasonic Inverter 420 Lít" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGQLGX4gViGI2jYpqljlvmL-__VqSBc9Z2vhxk3LOhsUUmKP9HJSLxRv33q81QYIPwnIW04ZiCAKhM8TfBVxcCWrbEQLru2qGLW-FrRdUIzHTWYgd84K_267M6IBJdht6DMKrpnnYCft2PcyewBUZ0m2ZPbxqS2GKlT9d4apwSICb_nKQBBwfV4yP1QmiIbV4NTogNEAir18Ppss-cJq3HTJtC0_CSC2a8RqaTDWnggYd2ceTF1iZvNtJmmTJRoZsrg2-hrlG6Qg" />
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">HOT</div>
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">Panasonic</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh Panasonic Inverter 420 Lít NR-BX471GPKV</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">14.150.000đ</span>
                        <span className="text-secondary line-through text-body-sm">16.200.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>

            {/* Product Card 4 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh Samsung RS64R5301B4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMSN_-ufHlz4_fG_OViW-0ryE51ggvsnWSm_dEZeljyz13LWyvnjm1is6ZulwwKZpSOhtSII0dhjgGZjaMo5g2JkKk2qqPXgeVGIWT81od0OfH90maz1JmkkP9KP-cPJuid5fIOXHZz2q3ZAdKbM4Ka0UAKe06O_2U2NYV6zGjeI7eqXCsAyqa5X47oesXAxkAeo_IsX_26UjE1vAdweWpPlJFn_sTw_Y4fthdgZouMDiQv0SMTS8EBPdiP5R5bew_p_3Mypo7Lw" />
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">Samsung</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh Samsung RS64R5301B4 Side By Side</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">28.900.000đ</span>
                        <span className="text-secondary line-through text-body-sm">32.500.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>

            {/* Product Card 5 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh Toshiba Inverter 253 Lít" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOfRMNsLDW0DwZBhTqzTa7IQqmuAg0jYNhOP9MN7LCoe2B5i_Uix3np_vWzq86L0mmyIdhsbYd01ZgoD2mYB80mLmERuBDbYA1nVSyJlVMC9PGLBjpvh_5aIaEBXPFyxWlFdjsAOD7RrWK3k-SjSz1ccQqAf7Q4Mu9SBWRxL85CWImuBDBlRDf7Ge6i9C-wIM92asn64q_qLwanA0wRgAgmW8lOphobmXyKq6JrR1PsAkQkdsRUFoFnBJfT1RcisM-4SBifM2EoQ" />
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">Toshiba</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh Toshiba Inverter 253 Lít GR-B31VU(SK)</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">6.790.000đ</span>
                        <span className="text-secondary line-through text-body-sm">7.990.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>

            {/* Product Card 6 */}
            <div className="bg-white rounded-xl product-card-shadow transition-all duration-300 group overflow-hidden border border-surface-variant/10">
                <Link to={`/DetailProduct/1`} className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Tủ lạnh Sharp Inverter 401 Lít" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7IWxhgVMbEnff-tIw1P0HygaogNyUKtAB2TIR_v0n4vmlzFgz8GYuSQowrazBHbDuEkkBky_0WnIQCyIMxF0oxgPUPf8Nui0Dxy63ZEr0SiyKwY_IhRaXDKvSw2j6uYK9_XOml1TbmQ4GYhJq4w0IyZCGgyIs8qByJGwhdM1bZfuKIwgUukfpOGrpc_XecL9VEMZRzx0RDdn4TVYbCmDliPuIM9q9vGjrRkCxoBp57F3bgn91-NS3jXbt41ukXWUB4zAXcaOtQ" />
                </Link>
                <div className="p-stack-md space-y-2">
                    <span className="text-secondary font-label-sm text-label-sm uppercase">Sharp</span>
                    <Link to={`/DetailProduct/1`} className="block">
                        <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">Tủ lạnh Sharp Inverter 401 Lít SJ-FX631V-SL</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="text-primary font-bold text-headline-md">13.800.000đ</span>
                        <span className="text-secondary line-through text-body-sm">15.500.000đ</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-4">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
