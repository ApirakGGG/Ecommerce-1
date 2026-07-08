"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Color
      </span>
      <div className="flex gap-2">
        {images.map((image) => {
          const isSelected = cartProduct.selectedImg.color === image.color;
          return (
            <button
              key={image.color}
              onClick={() => handleColorSelect(image)}
              title={image.color}
              className={`
                relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center
                ${isSelected
                  ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                  : "hover:scale-105"
                }
              `}
            >
              <span
                style={{ background: image.colorCode }}
                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm block"
              />
            </button>
          );
        })}
      </div>
      <span className="text-xs text-gray-500 capitalize">
        {cartProduct.selectedImg.color}
      </span>
    </div>
  );
};

export default SetColor;
