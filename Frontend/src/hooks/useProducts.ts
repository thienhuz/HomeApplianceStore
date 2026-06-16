import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { ProductDto, PagedResult, GetProductsFilters } from '../types';

export function useProducts(filters: GetProductsFilters) {
    const [data, setData] = useState<PagedResult<ProductDto> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await productApi.getProducts(filters);
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                const error = err as Error;
                if (isMounted) {
                    setError(error.message || 'Lỗi tải danh sách sản phẩm');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filters)]);

    return { data, loading, error };
}
