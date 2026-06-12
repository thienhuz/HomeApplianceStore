import React from 'react';

const products = [
    {
        id: 1,
        title: 'Tủ lạnh Bespoke Multi-door 648L',
        subtitle: 'Màu sắc: Trắng/Xanh Navy',
        price: '35.990.000₫',
        quantity: '01',
        total: '35.990.000₫',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzTjLOzz_amzxUfcbXtJW-CE2v9ET_ghN_hOO6bj8W-83AW9uW5jDML1x6PlXtb6EHxRXB50vw-iAN5fM-zLxWXqLPg94VM2NCnci5RCN7caKucwmy8hc_AIng8IeRbZqaRcHUm7Qm_P3Qr1r3JinMyeVh6iqfFQyTGo1xP-2d74gZpqpTqMTFMvWTPAjyNQSeVovIokRnNrPMuvhrPnJb8s2RSrPrOn5hHVZEdgGmrL2_dhdo5ubA7379mh7PS1nYW-Z6ZUxtHQ',
    },
    {
        id: 2,
        title: 'Máy lọc không khí PurePro AI v3',
        subtitle: 'Chế độ: Tự động điều chỉnh',
        price: '9.990.000₫',
        quantity: '01',
        total: '9.990.000₫',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL2Ykj5Rx7jxmHXetIBT-0JFq_oa6UR2WEZZeQqgaDOAbW2DiqupEgXhT3SKBsCrG2OAmLAbgEmS5VdCsKSGUa1J7xDBb8gCAc1OA1gmfO5OxL_qSzl-NVxbYjiutt7QDd1nE-FM0FZC-TrP3NxbNm9TP18SeVNVJejXvam2T4Eeyq2yrmmDNkJCe7u_ZGrZDm6CRDJ-TBpyFB1ycQaxNbXwgfKFkaJd_r6htXi8t8a6jdyhiVkKDXAsfUV4N5cRV3fXLEk7OuUA',
    },
];

const ProductList: React.FC = () => {
    return (
        <div className="bg-surface-container-lowest rounded-xl order-card-shadow overflow-hidden">
            <div className="p-gutter border-b border-outline-variant">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-primary">Danh sách sản phẩm</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-surface-container-low text-label-sm text-on-surface-variant uppercase tracking-wider">
                        <tr>
                            <th className="px-gutter py-4 font-semibold">Sản phẩm</th>
                            <th className="px-gutter py-4 font-semibold">Giá niêm yết</th>
                            <th className="px-gutter py-4 font-semibold text-center">Số lượng</th>
                            <th className="px-gutter py-4 font-semibold text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-surface-bright transition-colors">
                                <td className="px-gutter py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                                            <img alt={product.title} className="w-full h-full object-cover" src={product.image} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-body-md">{product.title}</p>
                                            <p className="text-body-sm text-on-surface-variant">{product.subtitle}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-gutter py-6 text-body-md">{product.price}</td>
                                <td className="px-gutter py-6 text-body-md text-center">{product.quantity}</td>
                                <td className="px-gutter py-6 text-body-md font-bold text-right">{product.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
