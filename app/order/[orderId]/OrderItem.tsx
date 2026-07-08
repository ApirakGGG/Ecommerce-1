"use client";
import { formatPrice } from "@/untils/formatPrice";
import { CartProductType } from "@/prisma/generated/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-t border-gray-100">
      {/* Image */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
        <Image
          src={item.selectedImg.image}
          alt={String(item.name)}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Name + color */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
        <p className="text-xs text-gray-400 capitalize mt-0.5">{item.selectedImg.color}</p>
      </div>

      {/* Price */}
      <div className="text-sm text-gray-600 w-24 text-center">
        {formatPrice(item.price)}
      </div>

      {/* Qty */}
      <div className="text-sm text-gray-600 w-16 text-center">
        ×{item.quantity}
      </div>

      {/* Total */}
      <div className="text-sm font-bold text-gray-900 w-24 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
