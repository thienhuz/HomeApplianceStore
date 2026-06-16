// DTO danh mục sản phẩm trả về từ API (sản phẩm, danh mục, thương hiệu, bộ lọc).

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

/** Tham số lọc khi gọi API lấy danh sách sản phẩm. */
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
