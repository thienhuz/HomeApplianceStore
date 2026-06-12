import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
            <div className="flex justify-between items-end mb-stack-md">
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg">Sản Phẩm Nổi Bật</h2>
                <Link className="font-label-md text-label-md text-primary hover:underline" to="#">Xem tất cả</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
                {/* Product Card 1 */}
                <Link to="/DetailProduct/1" className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col hover-lift relative group overflow-hidden">
                    <div className="absolute top-4 left-4 bg-error text-on-error font-label-sm text-label-sm px-2 py-1 rounded z-10">Hot</div>
                    <div className="aspect-square bg-surface-container-lowest rounded-md mb-stack-sm overflow-hidden flex items-center justify-center relative">
                        <img className="object-contain h-full w-full" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoflkasPZln4RNjz4oQgomLU51EKqqUlqeeDZBnWn_AJxswYwxWAerYuaSNbw7HeYpvxfNVzsDV6D7iMXUr9YWU2UL6QfXDkDY4apw9hRzQXhP8HoKaWYxE0bEOIOfrXKwH1eSG9EZfE0m99mlulpS6ToNF3cP2EdKbasJevC-6NHIQsMk7ZdKzIOrU6FEacj32S1TrwpcyUdM7DGRawR8m2Yb3fEf_ai0x6AIS2x8qCLBtLAMhdRMbYH-U8XGj4SUw_-yN6QtTw" />
                        <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-surface-container-lowest text-primary p-2 rounded-full shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors mx-1">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="font-body-lg text-body-lg text-on-surface mb-1 line-clamp-2">Tủ Lạnh Smart Inverter 500L</h3>
                        <div className="mt-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-label-md text-label-md text-primary">15.290.000 ₫</span>
                                <span className="font-body-sm text-body-sm text-on-secondary-container line-through">18.000.000 ₫</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Product Card 2 */}
                <Link to="/DetailProduct/1" className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col hover-lift relative group overflow-hidden">
                    <div className="absolute top-4 left-4 bg-error text-on-error font-label-sm text-label-sm px-2 py-1 rounded z-10">Hot</div>
                    <div className="aspect-square bg-surface-container-lowest rounded-md mb-stack-sm overflow-hidden flex items-center justify-center relative">
                        <img className="object-contain h-full w-full" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmYCVgGk5wn9fyQ3xvnroyXxrAEO5IwgxKXYvfvzvV6RSZwhqaXnSNeCoxbOKEAdLnLvYG_v3-GbEGuCgIk8_00fE0WWryqbQwNBYFbtA5kX3IwLKStCCg-1-nba4o80Cz13FKH3RlZvEGtUa6pQrzePI-Rn0Q2MUYWIBaZFTrGp1mzYMKVy8-x5q3oiGidICW2CueMAZr_9ShckoIBAA537YbmbWb7WDIyzsSJcvnwo2stbB1OQJsbsFWBVbYuEca3zbdK6sZwA" />
                        <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-surface-container-lowest text-primary p-2 rounded-full shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors mx-1">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="font-body-lg text-body-lg text-on-surface mb-1 line-clamp-2">Máy Giặt Lồng Ngang AI 10kg</h3>
                        <div className="mt-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-label-md text-label-md text-primary">9.590.000 ₫</span>
                                <span className="font-body-sm text-body-sm text-on-secondary-container line-through">12.000.000 ₫</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Product Card 3 */}
                <Link to="/DetailProduct/1" className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col hover-lift relative group overflow-hidden">
                    <div className="aspect-square bg-surface-container-lowest rounded-md mb-stack-sm overflow-hidden flex items-center justify-center relative">
                        <img className="object-contain h-full w-full" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA81JbyquGjPBXYTrtgygX1HuKmMefHkfIJ-ITfjG9ekzv5Z8SqtEwhLC6VS1jKJftk_atWW697tiptHAKfCqQouEicAhN5NLDfhRgEXw9lO7HlYXk6Lx0uwOQGSSfJS9FTrtEVMEBDPbCi8KA8ErTTHAfEzN93vr_cRa6zHTbAxRj89jsWvpiob-wSvbJ3Mg8aENwwjxRFrcXHq3I8NnfvhYInDFSQwknOOVlU3mcQIxqpF97i9KVO7w5qgLCdkdVjnTe8lOkHMw" />
                        <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-surface-container-lowest text-primary p-2 rounded-full shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors mx-1">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="font-body-lg text-body-lg text-on-surface mb-1 line-clamp-2">Máy Pha Cà Phê Chuyên Nghiệp</h3>
                        <div className="mt-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-label-md text-label-md text-primary">4.290.000 ₫</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Product Card 4 */}
                <div className="bg-surface-container-lowest rounded-lg shadow-level-1 p-stack-md flex flex-col hover-lift relative group">
                    <div className="absolute top-4 left-4 bg-error text-on-error font-label-sm text-label-sm px-2 py-1 rounded z-10">Sale</div>
                    <div className="aspect-square bg-surface-container-lowest rounded-md mb-stack-sm overflow-hidden flex items-center justify-center relative">
                        <img className="object-contain h-full w-full" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrWk1h8PDe4ftABlHnUL0WmohG6irYZOqPqRiqvIe31mygJfQ0QEaGlXbG0_jxGsrlswYjtQ9y1Ueb90ju6RrLkoAh2Deu2XYyJTM2Z9Y0hHrgz5vobY6ZAEWYdm_5ulxZZLEsPJJAT8JLinyCImd3RbCgRV8nZY1nulZiHCRNywpPfr8kkrsd7iIRX37mo5tXHV3A0naI7bRSI5d1Ue5ZZRd1s9UTK0mV2ncS7XZmkkb5z7kfY0eCSl-MmvHd2S8ApUKk5jmquQ" />
                        <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-surface-container-lowest text-primary p-2 rounded-full shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors mx-1">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="font-body-lg text-body-lg text-on-surface mb-1 line-clamp-2">Robot Hút Bụi Lau Nhà Thông Minh</h3>
                        <div className="mt-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-label-md text-label-md text-primary">6.890.000 ₫</span>
                                <span className="font-body-sm text-body-sm text-on-secondary-container line-through">8.500.000 ₫</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
