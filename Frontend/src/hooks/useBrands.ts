import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { BrandDto } from '../types';

export function useBrands() {
    const [data, setData] = useState<BrandDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await productApi.getBrands();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                const error = err as Error;
                if (isMounted) {
                    setError(error.message || 'Lỗi tải thương hiệu');
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
    }, []);

    return { data, loading, error };
}
