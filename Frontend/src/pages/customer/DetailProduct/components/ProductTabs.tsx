import React, { useState } from 'react';
import type { ProductTabs as ProductTabsType } from '../../../../types';

interface ProductTabsProps {
  tabs: ProductTabsType;
  reviewCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ tabs, reviewCount }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  return (
    <section className="mt-16">
      <div className="flex border-b border-slate-200 mb-8">
        <button
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${activeTab === 'description' ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
          type="button"
          onClick={() => setActiveTab('description')}
        >
          Mô tả sản phẩm
          {activeTab === 'description' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
          type="button"
          onClick={() => setActiveTab('reviews')}
        >
          Đánh giá ({reviewCount})
          {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>
      </div>

      {activeTab === 'description' ? (
        <div className="space-y-6 max-w-4xl" id="tab-description">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{tabs.description.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>{tabs.description.content}</p>
              {tabs.description.points.length > 0 && (
                <ul className="list-disc pl-5 space-y-2">
                  {tabs.description.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
            {tabs.description.featureImage && (
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <img alt="Interior feature" className="w-full h-full object-cover" src={tabs.description.featureImage} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8" id="tab-reviews">
          <div className="flex items-center gap-8 md:gap-12 p-8 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="text-center flex-shrink-0">
              <div className="text-4xl font-bold text-slate-900 mb-2">{tabs.reviews.ratingValue}</div>
              <div className="flex text-amber-400 mb-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: index < Math.round(Number(tabs.reviews.ratingValue)) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <div className="text-slate-500 text-xs">{reviewCount} đánh giá</div>
            </div>
            <div className="flex-1 space-y-2">
              {tabs.reviews.summary.map((summary) => (
                <div key={summary.rating} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-600 w-3">{summary.rating}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: summary.percent }} />
                  </div>
                  <span className="text-xs text-slate-400 w-8 text-right">{summary.percent}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-0">
            {tabs.reviews.reviews.map((review) => (
              <div key={review.name} className="py-6 border-b border-slate-100">
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">{review.name[0]}</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{review.name}</div>
                      <div className="text-xs text-slate-400">{review.badge}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: index < review.ratingFill ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductTabs;
