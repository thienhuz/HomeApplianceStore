import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productData } from './data';
import type { Product } from '../../../types';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import ProductGallery from './components/ProductGallery';
import ProductOverview from './components/ProductOverview';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo<Product>(() => productData[id ?? '1'] || productData['1'], [id]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  return (
    <div className="pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
      <ProductBreadcrumb title={product.title} />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <ProductGallery title={product.title} mainImage={product.mainImage} images={product.images} />
        <ProductOverview product={product} quantity={quantity} onQuantityChange={setQuantity} />
      </section>

      <ProductTabs tabs={product.tabs} reviewCount={product.reviewCount} />

      <RelatedProducts />
    </div>
  );
};

export default DetailProduct;
