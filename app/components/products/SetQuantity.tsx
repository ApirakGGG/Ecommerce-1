"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQtyProps> = ({
  cartProduct,
  cartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-4">
      {!cartCounter && (
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Quantity
        </span>
      )}
      <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={handleQtyDecrease}
          className="w-9 h-9 flex items-center justify-center text-xl font-semibold
            text-gray-600 hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-semibold text-gray-900 border-x border-gray-200">
          {cartProduct.quantity}
        </span>
        <button
          onClick={handleQtyIncrease}
          className="w-9 h-9 flex items-center justify-center text-xl font-semibold
            text-gray-600 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
