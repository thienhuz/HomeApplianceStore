import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from './components/Breadcrumb';
import SidebarFilters from './components/SidebarFilters';
import SortBar from './components/SortBar';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { useProducts } from '../../../hooks/useProducts';
import type { GetProductsFilters } from '../../../types';

const AllProductsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Use URL Search Params as the single source of truth for filters
    const filters: GetProductsFilters = useMemo(() => {
        const brandIds = searchParams.get('brandIds');
        return {
            pageNumber: parseInt(searchParams.get('pageNumber') || '1', 10),
            pageSize: 12,
            sortBy: searchParams.get('sortBy') || 'newest',
            keyword: searchParams.get('keyword') || undefined,
            categoryId: searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId')!, 10) : undefined,
            brandIds: brandIds ? brandIds.split(',').map(Number) : undefined,
            minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!, 10) : undefined,
            maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!, 10) : undefined,
            minRating: searchParams.get('minRating') ? parseInt(searchParams.get('minRating')!, 10) : undefined,
        };
    }, [searchParams]);

    const { data, loading, error } = useProducts(filters);

    const updateFilters = (newFilters: Partial<GetProductsFilters>, replace = false) => {
        const nextFilters = { ...filters, ...newFilters };
        const newParams = new URLSearchParams();
        
        if (nextFilters.pageNumber && nextFilters.pageNumber > 1) newParams.set('pageNumber', nextFilters.pageNumber.toString());
        if (nextFilters.sortBy && nextFilters.sortBy !== 'newest') newParams.set('sortBy', nextFilters.sortBy);
        if (nextFilters.keyword) newParams.set('keyword', nextFilters.keyword);
        if (nextFilters.categoryId) newParams.set('categoryId', nextFilters.categoryId.toString());
        if (nextFilters.brandIds && nextFilters.brandIds.length > 0) newParams.set('brandIds', nextFilters.brandIds.join(','));
        if (nextFilters.minPrice !== undefined) newParams.set('minPrice', nextFilters.minPrice.toString());
        if (nextFilters.maxPrice !== undefined) newParams.set('maxPrice', nextFilters.maxPrice.toString());
        if (nextFilters.minRating !== undefined) newParams.set('minRating', nextFilters.minRating.toString());
        
        setSearchParams(newParams, { replace });
    };

    const handleFilterChange = (newFilters: Partial<GetProductsFilters>) => {
        updateFilters({ ...newFilters, pageNumber: 1 }, true); // Dùng replace: true để không làm rác history khi click nhiều filter
    };

    const handlePageChange = (page: number) => {
        updateFilters({ pageNumber: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (sort: string) => {
        updateFilters({ sortBy: sort, pageNumber: 1 }, true);
    };

    const items = data?.items || [];
    const totalItems = data?.totalItems || 0;
    const totalPages = data?.totalPages || 0;
    const pageNumber = data?.pageNumber || 1;
    const pageSize = data?.pageSize || 12;

    return (
        <div className="max-w-container-max mx-auto px-4 md:px-8 min-h-screen">
            <Breadcrumb />
            {error && (
                <div className="mb-4 p-4 text-center text-red-700 bg-red-50 border border-red-200/60 rounded-xl text-sm">{error}</div>
            )}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <SidebarFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
                <div className="flex-1 min-w-0">
                    {filters.keyword && (
                        <h1 className="text-lg font-semibold text-slate-900 mb-4">
                            Kết quả tìm kiếm cho: <span className="text-primary">"{filters.keyword}"</span>
                        </h1>
                    )}
                    <SortBar
                        totalItems={totalItems}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        sortBy={filters.sortBy || 'newest'}
                        onSortChange={handleSortChange}
                    />
                    <ProductGrid
                        products={items}
                        loading={loading}
                    />
                    {!loading && (
                        <Pagination
                            totalPages={totalPages}
                            pageNumber={pageNumber}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProductsPage;
