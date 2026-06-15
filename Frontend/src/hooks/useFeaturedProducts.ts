import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { ProductDto } from '../services/productApi';

export function useFeaturedProducts(limit: number = 4) {
    const [data, setData] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await productApi.getFeaturedProducts(limit);
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                const error = err as Error;
                if (isMounted) {
                    setError(error.message || 'Lỗi tải sản phẩm nổi bật');
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
    }, [limit]);

    return { data, loading, error };
}
