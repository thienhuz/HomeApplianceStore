import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RelatedProducts from './components/RelatedProducts';

type ProductDescriptionTab = {
  title: string;
  content: string;
  points: string[];
  featureImage: string;
};

type ProductReviewSummary = {
  rating: number;
  percent: string;
};

type ProductReview = {
  name: string;
  badge: string;
  ratingFill: number;
  content: string;
};

type ProductTabs = {
  description: ProductDescriptionTab;
  reviews: {
    ratingValue: string;
    summary: ProductReviewSummary[];
    reviews: ProductReview[];
  };
};

type Product = {
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

const productData: Record<string, Product> = {
  '1': {
    id: '1',
    brand: 'SAMSUNG',
    title: 'Tủ lạnh Samsung Inverter 382 Lít RT38K50822C/SV',
    rating: 4.5,
    reviewCount: 128,
    stock: 'Còn 24 sản phẩm',
    price: '12.490.000đ',
    oldPrice: '15.990.000đ',
    discountLabel: '-22%',
    description: 'Tủ lạnh Samsung RT38K50822C/SV với dung tích 382 Lít, thiết kế sang trọng với mặt gương đen cao cấp, phù hợp cho gia đình từ 3-5 thành viên.',
    highlights: [
      'Công nghệ Digital Inverter tiết kiệm điện năng vận hành êm ái.',
      'Hệ thống Twin Cooling Plus giúp thực phẩm tươi lâu hơn gấp 2 lần.',
      '5 chế độ chuyển đổi linh hoạt theo nhu cầu sử dụng.',
      'Khử mùi kháng khuẩn Deodorizing Filter.',
    ],
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8bUKJxDP-uj92n2BPejFD3AdDccTvXRIxno_l_pMbZjbabCt72nSHxlirCXM1jg8yj03mA1TlpOH-kIRylqdMTalHyIuAtFiNDFGK7a3xuKL7ZKI18JkL5m--WIFaOe_Bxt_itEscAXTZbAAJfX4vJ9aUtZyNK3wWXdR4cRbIZxVreKizgjEEJmCAxkJfaduJlQ9YK5mr8ZLI8-QLwE42QKT7HL1uXI7CtyIqzxjoRmHotA0jR_VAOKm026tcXVeICRaDgiM4hg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRICtQc3TEkTZbd3wzxefz-qgotV3r6vk_NGaASTLFu_lbQOdPnl6Qll1wyu_XidHk8W61e6XQvA-91TjJFcB2ai3aP4hk7g3zHP8g8hoL5Fxfq61GQC4UfaxiQD2zL1UK75xEVDUNH4kGxPE2zMuJq99SD9aesaBnoHGJj8qeQl-Cfdd7ygIs0EvCVQoxYEOmY_Skd8TgS4bRhFkoiRe-3TQcQqduOUiRRGKru1dZm6puojY_pn7yOOmdy2yRSv9vOWpHtLpTqQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiH5-g6n2z7DdnJd4XUF61kMNUu2HdoifrMwzCfzsHsVykntCQthD-l6MCZpPIMB8x1xrUs_-HH4LMX7ZAWbmSR2MaaSEeCaieanhPoHq2DRpdwLsR-M6o40uPQE9IR2zzJvUXA3VY_VAVO_5FFhxtDFUehRls_KfhtEZ52gC2EZ3IjaOCIwgU5WGUul5bQ5GMnKDjVR11EEloDaykcOpFI62EIhwtk3OFqLZouZD1zsmUUZIB2xN7vu2Q-mTw6DQqNhGRrOA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFg3l85cotggBw0p88VYe2WBxixRkrZm-tTsxB8-BFuIJgaqEL4NQ2IdJSnAd3Tpopavpd1O3v31x5V3JoCiNroiQJKrJtkqaL2FjIcYTtlIL4XtrJnSH2K-V3Gpy0zk4xHCINxCD12ULESE3nSXFFZpGNjpIFzlHPc3a30dU3nD3J0Ih75RGb8tSmaS7lstCVRcJLfxNsJ9lvHVULJzf6YeUqW33BaYMTsm3R3Zt7_q9-egDFtfyJzllYYXhZGb_hbfxZ7UUcJg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoCxdChTZDIJnWcnGJ5N-CmaDIe2aclttn-3kYqxtbtq1RSW-7VH1obmCJNqtE7QOYT6Z71i2riE8Vf8aZhpBakitgsdberYWXr6fdq5Cpfb7kPH6Vz5OHHCkV5UtJs6G_5eFpuPb7n7RT23NeULZx0FHPvUZiho0uYJC067Ks2nnY9npVSDlcHaqga5PndBAKYFOjOZQ6Ceuatv5FkyQkiqbVw6eKsru1w4HnQyQ9w8FFyQHPCyaQ0JUInwfBeyIpcEvAO4OHQw',
    ],
    note: 'Giá đã bao gồm VAT và miễn phí lắp đặt tại nhà.',
    tabs: {
      description: {
        title: 'Đặc điểm nổi bật',
        content: 'Tủ lạnh Samsung RT38K50822C/SV với dung tích 382 Lít, thiết kế sang trọng với mặt gương đen cao cấp, phù hợp cho gia đình từ 3-5 thành viên.',
        points: [
          'Công nghệ Digital Inverter tiết kiệm điện năng vận hành êm ái.',
          'Hệ thống Twin Cooling Plus giúp thực phẩm tươi lâu hơn gấp 2 lần.',
          '5 chế độ chuyển đổi linh hoạt theo nhu cầu sử dụng.',
          'Khử mùi kháng khuẩn Deodorizing Filter.',
        ],
        featureImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBAc_3bwBfcKyn9tYdJ-NPePUxzZiB69rm9Km5bMmS_QvQxQRva6aGVnSMuVVgh6cdEANpBLRS-n2NPUBkHH4wSbWRuhfnJXADRH9dTLv4KGKgsBzJMGZcAwzd5i96nWix3qBvrU2Y7xu-H3mFtOv3AeIWNIufh-iA-1hYD9WVvqQmmHWd7m3ghMkTLe7MmSn-6C9Ss_SBrw45Og9Fgoc9pa3Xvaje1D9DsT0dwD3RtbEQzoCT3WADLF74lhrZeGNY-ihOG-kNpXA',
      },
      reviews: {
        ratingValue: '4.5',
        summary: [
          { rating: 5, percent: '75%' },
          { rating: 4, percent: '15%' },
          { rating: 3, percent: '5%' },
        ],
        reviews: [
          {
            name: 'Nguyễn Văn An',
            badge: 'Đã mua tại HomeApplianceStore',
            ratingFill: 5,
            content: 'Tủ lạnh chạy rất êm, thiết kế mặt gương cực kỳ sang trọng. Nhân viên lắp đặt nhiệt tình, giao hàng nhanh đúng hẹn. Rất hài lòng với sản phẩm này.',
          },
          {
            name: 'Trần Thị Hoa',
            badge: 'Đã mua tại HomeApplianceStore',
            ratingFill: 4,
            content: 'Sản phẩm tốt trong tầm giá, ngăn đông làm lạnh nhanh. Tuy nhiên mặt gương hơi dễ bám vân tay nên cần lau chùi thường xuyên.',
          },
        ],
      },
    },
  },
};

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo<Product>(() => productData[id ?? '1'] || productData['1'], [id]);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  React.useEffect(() => {
    setSelectedImage(product.mainImage);
  }, [product.mainImage]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  const ratingStars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
      <nav className="mb-stack-lg flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
        <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link className="hover:text-primary transition-colors" to="/category">Tủ lạnh</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface font-medium">{product.title}</span>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          <div className="flex-1 bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm aspect-square relative group">
              <img className="w-full h-full object-contain p-8" alt={product.title} src={selectedImage} />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in">
                <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
              </div>
            </div>
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 shrink-0 pb-2 md:pb-0">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 bg-surface-container-lowest rounded-lg p-2 overflow-hidden transition-all ${selectedImage === image ? 'border-2 border-primary' : 'border-2 border-transparent hover:shadow-md'} focus:outline-none`}
                >
                  <img alt={`Thumb ${index + 1}`} className="w-full h-full object-contain" src={image} />
                </button>
              ))}
            </div>
          </div>

        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-2 inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full w-fit font-label-sm text-label-sm">
            {product.brand}
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm leading-tight">{product.title}</h1>
          <div className="flex items-center gap-4 mb-stack-md flex-wrap">
            <div className="flex items-center text-primary">
              {ratingStars.map((star) => (
                <span
                  key={star}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: star <= product.rating ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {star <= product.rating ? 'star' : 'star_half'}
                </span>
              ))}
              <span className="ml-2 font-body-sm text-on-surface-variant">({product.rating}/5 - {product.reviewCount} đánh giá)</span>
            </div>
            <div className="h-4 w-px bg-outline-variant" />
            <div className="flex items-center gap-1 text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-sm">inventory_2</span>
              <span>{product.stock}</span>
            </div>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl mb-stack-lg">
            <div className="flex items-baseline gap-4 mb-2 flex-wrap">
              <span className="font-display-lg text-display-lg text-primary">{product.price}</span>
              <span className="font-body-md text-body-md text-on-surface-variant line-through">{product.oldPrice}</span>
              <span className="px-2 py-0.5 bg-primary-container text-on-primary-container rounded font-label-md text-label-md">{product.discountLabel}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant italic">{product.note}</p>
          </div>

          <div className="space-y-stack-lg">
            <div className="flex flex-col gap-stack-sm">
              <label className="font-label-md text-label-md text-on-surface">Số lượng</label>
              <div className="flex items-center w-32 border border-outline rounded-lg overflow-hidden h-12">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-highest active:bg-surface-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <input
                  className="w-12 text-center border-none bg-transparent focus:ring-0 font-bold p-0"
                  max={24}
                  min={1}
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  onClick={() => setQuantity((prev) => Math.min(prev + 1, 24))}
                  className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-highest active:bg-surface-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-[2] bg-primary-container text-white py-4 rounded-lg font-headline-md text-headline-md hover:opacity-90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2" type="button">
                <span className="material-symbols-outlined">shopping_bag</span>
                THÊM VÀO GIỎ HÀNG
              </button>
              <button className="flex-1 border-2 border-primary text-primary py-4 rounded-lg font-headline-md text-headline-md hover:bg-primary/5 transition-all active:scale-95" type="button">
                MUA NGAY
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-stack-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md">Giao hàng nhanh</h4>
                  <p className="text-[12px] text-on-surface-variant">Trong 2-4 giờ làm việc</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md">Bảo hành 2 năm</h4>
                  <p className="text-[12px] text-on-surface-variant">Chính hãng Samsung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            ĐÁNH GIÁ ({product.reviewCount})
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="space-y-6 max-w-4xl" id="tab-description">
            <h3 className="font-headline-md text-headline-md mb-4">{product.tabs.description.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                <p>{product.tabs.description.content}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {product.tabs.description.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  alt="Interior feature"
                  className="w-full h-full object-cover"
                  src={product.tabs.description.featureImage}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8" id="tab-reviews">
            <div className="flex items-center gap-12 p-8 bg-surface-container-low rounded-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{product.tabs.reviews.ratingValue}</div>
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
                <div className="text-on-surface-variant text-sm">{product.reviewCount} đánh giá</div>
              </div>
              <div className="flex-1 space-y-2">
                {product.tabs.reviews.summary.map((summary) => (
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
              {product.tabs.reviews.reviews.map((review) => (
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

      <RelatedProducts />
    </div>
  );
};

export default DetailProduct;
