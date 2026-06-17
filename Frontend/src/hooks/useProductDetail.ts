import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { ProductDetail } from '../types';

export function useProductDetail(id?: number) {
    const [data, setData] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || Number.isNaN(id)) {
            setError('Sản phẩm không hợp lệ');
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const result = await productApi.getProductDetail(id);
                if (isMounted) setData(result);
            } catch (err) {
                const error = err as Error;
                if (isMounted) setError(error.message || 'Lỗi tải chi tiết sản phẩm');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return { data, loading, error };
}
