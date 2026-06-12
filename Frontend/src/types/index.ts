export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

// DetailProduct Types
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
