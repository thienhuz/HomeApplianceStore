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
