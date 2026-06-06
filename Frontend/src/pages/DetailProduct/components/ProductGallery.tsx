import React, { useEffect, useState } from 'react';

interface ProductGalleryProps {
  title: string;
  mainImage: string;
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ title, mainImage, images }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  return (
    <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
      <div className="flex-1 bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm aspect-square relative group">
        <img className="w-full h-full object-contain p-8" alt={title} src={selectedImage} />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in">
          <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
        </div>
      </div>

      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 shrink-0 pb-2 md:pb-0">
        {images.map((image, index) => (
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
  );
};

export default ProductGallery;
