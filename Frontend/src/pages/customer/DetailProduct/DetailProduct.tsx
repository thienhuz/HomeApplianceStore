import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../../../types';
import { useProductDetail } from '../../../hooks/useProductDetail';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import ProductGallery from './components/ProductGallery';
import ProductOverview from './components/ProductOverview';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : undefined;
  const { data: detail, loading, error } = useProductDetail(productId);
  const [quantity, setQuantity] = useState(1);

  // Map dữ liệu API -> shape mà các component đang dùng.
  const product = useMemo<Product | null>(() => {
    if (!detail) return null;
    return {
      id: String(detail.id),
      brand: detail.brand,
      title: detail.title,
      rating: detail.rating,
      reviewCount: detail.reviewCount,
      stock: detail.stockQuantity > 0 ? `Còn ${detail.stockQuantity} sản phẩm` : 'Tạm hết hàng',
      price: detail.price,
      oldPrice: detail.oldPrice ?? '',
      discountLabel: detail.discountLabel ?? '',
      description: detail.description ?? '',
      highlights: detail.highlights,
      mainImage: detail.mainImage ?? '',
      images: detail.images.length > 0 ? detail.images : detail.mainImage ? [detail.mainImage] : [],
      note: detail.note ?? '',
      tabs: {
        description: {
          title: detail.featureTitle ?? 'Đặc điểm nổi bật',
          content: detail.description ?? '',
          points: detail.highlights,
          featureImage: detail.featureImageUrl ?? '',
        },
        reviews: {
          ratingValue: detail.rating.toFixed(1),
          summary: detail.reviewSummary,
          reviews: detail.reviews.map((r) => ({
            name: r.name,
            badge: r.badge,
            ratingFill: r.ratingFill,
            content: r.content ?? '',
          })),
        },
      },
    };
  }, [detail]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center px-4">
        <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
        <p className="text-lg font-semibold text-slate-900">Không tìm thấy sản phẩm</p>
        <p className="text-sm text-slate-500">{error ?? 'Sản phẩm không tồn tại hoặc đã bị ẩn.'}</p>
      </div>
    );
  }

  return (
    <div className="pb-16 px-4 md:px-8 max-w-container-max mx-auto min-h-screen">
      <ProductBreadcrumb title={product.title} />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ProductGallery title={product.title} mainImage={product.mainImage} images={product.images} />
        <ProductOverview product={product} quantity={quantity} onQuantityChange={setQuantity} />
      </section>

      <ProductTabs tabs={product.tabs} reviewCount={product.reviewCount} />

      <RelatedProducts productId={detail!.id} />
    </div>
  );
};

export default DetailProduct;
