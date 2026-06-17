import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { ProductDto } from '../types';

export function useRelatedProducts(id?: number, limit: number = 4) {
    const [data, setData] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id || Number.isNaN(id)) {
            setData([]);
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);

        const fetchData = async () => {
            try {
                const result = await productApi.getRelatedProducts(id, limit);
                if (isMounted) setData(result);
            } catch {
                if (isMounted) setData([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id, limit]);

    return { data, loading };
}
