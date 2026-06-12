import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Product Card 1 */}
            <div className="group product-card-shadow product-card-hover bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300">
                <Link to="/DetailProduct/1" className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Máy giặt 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8gmLqfrfsrYLmBOivrw_H8T5ehW1sbYwk6LYiG575hTMB212GRdHhCc57fZERBDmoVLCcuZx_s4E2iq_6OzG_ylFXeH4jgb5JpOoUyNnpBM_P1CyjCgPxk_WZFNk-0pqxs5SSvafGGt_KAyNYLISPDlyCQFP3HFxDL49FGFRnr68fq5SGPi8sHt5uRjIMx5Y3cQteJem7zlzxraCp0hRDj15FQt8H9EuLijzP1mpkLdNfqNwPQchw_uF9CXihv7s9ZPWxIbYZ0A" />
                    <span className="absolute top-3 left-3 bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded">-15%</span>
                </Link>
                <div className="p-stack-md">
                    <p className="font-label-sm text-label-sm text-outline mb-1 uppercase tracking-tight">Samsung</p>
                    <Link to="/DetailProduct/1" className="block">
                        <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-2 line-clamp-2">Máy Giặt Inverter 9kg WW90TP44DSH/SV</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-md text-headline-md text-primary">12.490.000đ</span>
                        <span className="font-body-sm text-body-sm text-outline line-through">14.900.000đ</span>
                    </div>
                    <button className="mt-stack-md w-full py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Card 2 */}
            <div className="group product-card-shadow product-card-hover bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300">
                <Link to="/DetailProduct/1" className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Máy giặt 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvQLkyQToZXfokx1e1j0e9xhEkbYPTt2Y7QRyOmCXY9z5XLc-TgS7FlfzC6mPevpxnRbtvMG44qsnzSkWmtC8e0nLXWGIq86foIk_qeXepJ99Cjt2H7_8asYp_1W5PomyaF0rMDiOMFGVEyPfPFHSjUAKEfaz5A30J6omRF6gY054dxYmhySjJQFiQP4UxYgLkjZMiVmVhuPCW2pnEyVSDH_IO-6w0BKiFwOTiA8rnuGuK6oTe1eI4y3R7b6iGsXd3a8jrxIDcKQ" />
                </Link>
                <div className="p-stack-md">
                    <p className="font-label-sm text-label-sm text-outline mb-1 uppercase tracking-tight">LG Electronics</p>
                    <Link to="/DetailProduct/1" className="block">
                        <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-2 line-clamp-2">Máy Giặt LG AI DD™ 11kg FV1411S4P</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-md text-headline-md text-primary">15.990.000đ</span>
                    </div>
                    <button className="mt-stack-md w-full py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Card 3 */}
            <div className="group product-card-shadow product-card-hover bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300">
                <Link to="/DetailProduct/1" className="relative aspect-square bg-surface-container-low overflow-hidden block">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Máy giặt 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnq4YXw2brnULAU55G7oRXdzdfwkGjfUWyVymZ9U6EbBpilEKSHWg0YZTkf9U5pmUTNDknTGh4ukVCMxtx9S2LmCvVsBw0FiWm5VQ--R7gcqGJIvh2BlYcOB6LJJG-_qfWIa1yeKk--e5neAs5aDEMVRU0zWI2As6Niq3QJdTCxCvmJjqUoHVMFEJkS0qWb1FzmiZVpYk_l2ANXRr5PxBwcz1ur8eaIcu0ZEE66dST9I3D97ZSf1t4Pg0VCxLARUP2QG-XYLMMEQ" />
                </Link>
                <div className="p-stack-md">
                    <p className="font-label-sm text-label-sm text-outline mb-1 uppercase tracking-tight">Electrolux</p>
                    <Link to="/DetailProduct/1" className="block">
                        <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-2 line-clamp-2">Máy Giặt Sấy Electrolux Inverter 11 kg EWW1142Q7WB</h3>
                    </Link>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-md text-headline-md text-primary">18.250.000đ</span>
                    </div>
                    <button className="mt-stack-md w-full py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Additional items would be here */}
        </div>
    );
};

export default ProductGrid;
