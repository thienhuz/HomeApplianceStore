// Kiểu dữ liệu hiển thị cho trang chi tiết sản phẩm (mô tả, đánh giá, sản phẩm liên quan).

export type ProductDescriptionTab = {
  title: string;
  content: string;
  points: string[];
  featureImage: string;
};

export type ProductReviewSummary = {
  rating: number;
  percent: string;
};

export type ProductReview = {
  name: string;
  badge: string;
  ratingFill: number;
  content: string;
};

export type ProductTabs = {
  description: ProductDescriptionTab;
  reviews: {
    ratingValue: string;
    summary: ProductReviewSummary[];
    reviews: ProductReview[];
  };
};

export type Product = {
  id: string;
  brand: string;
  title: string;
  rating: number;
  reviewCount: number;
  stock: string;
  price: string;
  oldPrice: string;
  discountLabel: string;
  description: string;
  highlights: string[];
  mainImage: string;
  images: string[];
  note: string;
  tabs: ProductTabs;
};

export type RelatedProduct = {
  id: string;
  brand: string;
  title: string;
  price: string;
  oldPrice: string;
  img: string;
};

// ===== Dữ liệu chi tiết sản phẩm trả về từ API (GET /products/{id}) =====

export interface ProductDetailReview {
  name: string;
  badge: string;
  ratingFill: number;
  content?: string | null;
  createdAt?: string | null;
}

export interface ProductDetail {
  id: number;
  brand: string;
  categoryName: string;
  title: string;
  slug: string;
  description?: string | null;
  price: string;
  oldPrice?: string | null;
  discountLabel?: string | null;
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  note?: string | null;
  featureTitle?: string | null;
  featureImageUrl?: string | null;
  highlights: string[];
  mainImage?: string | null;
  images: string[];
  reviewSummary: ProductReviewSummary[];
  reviews: ProductDetailReview[];
}
