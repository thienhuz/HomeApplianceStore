import React, { useEffect, useMemo, useState } from 'react';

interface ProductGalleryProps {
  title: string;
  mainImage: string;
  images: string[];
}

const PLACEHOLDER = 'https://placehold.co/600x600/f1f5f9/94a3b8?text=No+Image';

const ProductGallery: React.FC<ProductGalleryProps> = ({ title, mainImage, images }) => {
  // Danh sách ảnh hiển thị; nếu rỗng thì dùng ảnh chính (hoặc 1 ô placeholder).
  const gallery = useMemo(() => {
    if (images.length > 0) return images;
    return mainImage ? [mainImage] : [''];
  }, [images, mainImage]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset về ảnh đầu khi đổi sản phẩm.
  const signature = gallery.join('|');
  useEffect(() => {
    setSelectedIndex(0);
  }, [signature]);

  const current = gallery[selectedIndex] || PLACEHOLDER;

  return (
    <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
      <div className="flex-1 bg-white rounded-2xl overflow-hidden border border-slate-200 aspect-square relative group">
        <img className="w-full h-full object-contain p-8" alt={title} src={current} />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-zoom-in">
          <span className="material-symbols-outlined text-white/80 text-4xl drop-shadow-md">zoom_in</span>
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 shrink-0 pb-2 md:pb-0">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 md:w-24 md:h-24 shrink-0 bg-white rounded-xl p-2 overflow-hidden transition-all border-2 ${
                selectedIndex === index
                  ? 'border-primary'
                  : 'border-slate-200 hover:border-slate-300'
              } focus:outline-none`}
            >
              <img alt={`Thumb ${index + 1}`} className="w-full h-full object-contain" src={image || PLACEHOLDER} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
