import React, { useState } from 'react';
import type { ProductTabs as ProductTabsType } from '../../../../types';

interface ProductTabsProps {
  tabs: ProductTabsType;
  reviewCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ tabs, reviewCount }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  return (
    <section className="mt-20">
      <div className="flex border-b border-outline-variant mb-8">
        <button
          className={`px-8 py-4 font-label-md text-label-md transition-all ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
          type="button"
          onClick={() => setActiveTab('description')}
        >
          MÔ TẢ SẢN PHẨM
        </button>
        <button
          className={`px-8 py-4 font-label-md text-label-md transition-all ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
          type="button"
          onClick={() => setActiveTab('reviews')}
        >
          ĐÁNH GIÁ ({reviewCount})
        </button>
      </div>

      {activeTab === 'description' ? (
        <div className="space-y-6 max-w-4xl" id="tab-description">
          <h3 className="font-headline-md text-headline-md mb-4">{tabs.description.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant">
              <p>{tabs.description.content}</p>
              <ul className="list-disc pl-5 space-y-2">
                {tabs.description.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            {tabs.description.featureImage && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img alt="Interior feature" className="w-full h-full object-cover" src={tabs.description.featureImage} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8" id="tab-reviews">
          <div className="flex items-center gap-12 p-8 bg-surface-container-low rounded-2xl">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{tabs.reviews.ratingValue}</div>
              <div className="flex text-primary mb-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: index < 4 ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {index < 4 ? 'star' : 'star_half'}
                  </span>
                ))}
              </div>
              <div className="text-on-surface-variant text-sm">{reviewCount} đánh giá</div>
            </div>
            <div className="flex-1 space-y-2">
              {tabs.reviews.summary.map((summary) => (
                <div key={summary.rating} className="flex items-center gap-4">
                  <span className="text-sm w-4">{summary.rating}</span>
                  <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: summary.percent }} />
                  </div>
                  <span className="text-sm w-8">{summary.percent}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {tabs.reviews.reviews.map((review) => (
              <div key={review.name} className="p-6 border-b border-outline-variant">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">{review.name[0]}</div>
                    <div>
                      <div className="font-label-md">{review.name}</div>
                      <div className="text-[12px] text-on-surface-variant">{review.badge}</div>
                    </div>
                  </div>
                  <div className="text-primary flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: index < review.ratingFill ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {index < review.ratingFill ? 'star' : 'star_half'}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductTabs;
