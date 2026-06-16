import React, { useState, useEffect } from 'react';
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
    const categoryIdParam = searchParams.get('categoryId');
    const keywordParam = searchParams.get('keyword');

    const [filters, setFilters] = useState<GetProductsFilters>({
        pageNumber: 1,
        pageSize: 12,
        sortBy: 'newest',
        keyword: keywordParam || undefined,
        categoryId: categoryIdParam ? parseInt(categoryIdParam, 10) : undefined
    });

    useEffect(() => {
        const newCategoryId = searchParams.get('categoryId');
        const newKeyword = searchParams.get('keyword');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilters(prev => ({
            ...prev,
            keyword: newKeyword || undefined,
            categoryId: newCategoryId ? parseInt(newCategoryId, 10) : undefined,
            pageNumber: 1
        }));
    }, [searchParams]);

    const { data, loading, error } = useProducts(filters);

    const handleFilterChange = (newFilters: Partial<GetProductsFilters>) => {
        if ('categoryId' in newFilters) {
            const newParams = new URLSearchParams(searchParams);
            if (newFilters.categoryId === undefined || newFilters.categoryId === null) {
                newParams.delete('categoryId');
            } else {
                newParams.set('categoryId', newFilters.categoryId.toString());
            }
            setSearchParams(newParams);
        }
        setFilters(prev => ({ ...prev, ...newFilters, pageNumber: 1 }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, pageNumber: page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (sort: string) => {
        setFilters(prev => ({ ...prev, sortBy: sort, pageNumber: 1 }));
    };

    const items = data?.items || [];
    const totalItems = data?.totalItems || 0;
    const totalPages = data?.totalPages || 0;
    const pageNumber = data?.pageNumber || 1;
    const pageSize = data?.pageSize || 12;

    return (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen">
            <Breadcrumb />
            {error && (
                <div className="mb-4 p-4 text-center text-error bg-error-container rounded-lg">{error}</div>
            )}
            <div className="flex flex-col md:flex-row gap-gutter">
                <SidebarFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
                <div className="flex-1">
                    {keywordParam && (
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-stack-md">
                            Kết quả tìm kiếm cho: <span className="text-primary">"{keywordParam}"</span>
                        </h1>
                    )}
                    <SortBar
                        totalItems={totalItems}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        sortBy={filters.sortBy}
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
