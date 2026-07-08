"use client";
import Image from "next/image";
import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="flex gap-3 h-full max-h-[500px] min-h-[300px]">
      {/* Thumbnail strip */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-1">
        {product.images.map((image: SelectedImgType) => {
          const isSelected = cartProduct.selectedImg.color === image.color;
          return (
            <button
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-16 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200
                ${isSelected
                  ? "border-gray-900 shadow-md scale-105"
                  : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain p-1"
              />
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          fill
          src={cartProduct.selectedImg.image}
          alt={String(cartProduct.name)}
          className="object-contain p-4"
        />
      </div>
    </div>
  );
};

export default ProductImage;
