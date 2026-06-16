import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import type { CategoryDto } from '../types';

export function useCategories() {
    const [data, setData] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await productApi.getCategories();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                const error = err as Error;
                if (isMounted) {
                    setError(error.message || 'Lỗi tải danh mục');
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
