import type {
    BrandDto,
    CategoryDto,
    GetProductsFilters,
    PagedResult,
    ProductDto,
    SearchSuggestion,
} from '../types';
import { request } from './apiClient';

export const productApi = {
    getProducts: async (filters: GetProductsFilters): Promise<PagedResult<ProductDto>> => {
        const params = new URLSearchParams();
        if (filters.pageNumber) params.append('PageNumber', filters.pageNumber.toString());
        if (filters.pageSize) params.append('PageSize', filters.pageSize.toString());
        if (filters.sortBy) params.append('SortBy', filters.sortBy);
        if (filters.keyword) params.append('Keyword', filters.keyword);
        if (filters.categoryId) params.append('CategoryId', filters.categoryId.toString());
        if (filters.brandIds && filters.brandIds.length > 0) {
            filters.brandIds.forEach(id => params.append('BrandIds', id.toString()));
        }
        if (filters.minPrice) params.append('MinPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('MaxPrice', filters.maxPrice.toString());
        if (filters.minRating) params.append('MinRating', filters.minRating.toString());

        return request<PagedResult<ProductDto>>(`/products?${params.toString()}`);
    },

    getFeaturedProducts: async (limit: number = 4): Promise<ProductDto[]> => {
        return request<ProductDto[]>(`/products/featured?limit=${limit}`);
    },

    getCategories: async (): Promise<CategoryDto[]> => {
        return request<CategoryDto[]>('/categories');
    },

    getBrands: async (): Promise<BrandDto[]> => {
        return request<BrandDto[]>('/brands');
    },

    getSearchSuggestions: async (keyword: string, limit: number = 5): Promise<SearchSuggestion> => {
        const params = new URLSearchParams({ keyword, limit: limit.toString() });
        return request<SearchSuggestion>(`/products/search-suggestions?${params.toString()}`);
    }
};
