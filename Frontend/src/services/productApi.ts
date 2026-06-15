import { request } from './apiClient';

export interface ProductDto {
    id: number;
    brand: string;
    categoryName: string;
    title: string;
    slug: string;
    description?: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    imageAlt: string;
    badge?: string;
    createdAt?: string;
    stockQuantity: number;
}

export interface CategoryDto {
    categoryId: number;
    categoryName: string;
    slug: string;
    parentId?: number;
}

export interface BrandDto {
    brandId: number;
    brandName: string;
    logoUrl?: string;
}

export interface PagedResult<T> {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface GetProductsFilters {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    categoryId?: number;
    brandIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
}

export const productApi = {
    getProducts: async (filters: GetProductsFilters): Promise<PagedResult<ProductDto>> => {
        const params = new URLSearchParams();
        if (filters.pageNumber) params.append('PageNumber', filters.pageNumber.toString());
        if (filters.pageSize) params.append('PageSize', filters.pageSize.toString());
        if (filters.sortBy) params.append('SortBy', filters.sortBy);
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
    }
};
