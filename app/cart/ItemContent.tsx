"use client";
import { formatPrice } from "@/untils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdClose } from "react-icons/md";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200 p-4">
      <div className="grid grid-cols-12 gap-4 items-center">

        {/* Product info — col 5 */}
        <div className="col-span-12 md:col-span-5 flex gap-4 items-center">
          {/* Image */}
          <Link href={`/product/${item.id}`} className="relative flex-shrink-0">
            <div className="relative w-[90px] h-[90px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={item.selectedImg.image}
                alt={item.name as string}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Details */}
          <div className="flex flex-col gap-1 min-w-0">
            <Link
              href={`/product/${item.id}`}
              className="font-semibold text-gray-900 text-sm leading-tight hover:text-gray-600 transition-colors line-clamp-2"
            >
              {item.name}
            </Link>

            {/* Color chip */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: item.selectedImg.colorCode }}
              />
              <span className="text-xs text-gray-400">{item.selectedImg.color}</span>
            </div>

            {/* Remove button */}
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors w-fit mt-1"
            >
              <MdClose size={14} />
              Remove
            </button>
          </div>
        </div>

        {/* Unit Price — col 2 */}
        <div className="hidden md:flex col-span-2 justify-center">
          <span className="text-sm font-medium text-gray-600">{formatPrice(item.price)}</span>
        </div>

        {/* Quantity stepper — col 3 */}
        <div className="col-span-7 md:col-span-3 flex justify-start md:justify-center">
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() => handleCartQtyIncrease(item)}
            handleQtyDecrease={() => handleCartQtyDecrease(item)}
          />
        </div>

        {/* Line Total — col 2 */}
        <div className="col-span-5 md:col-span-2 flex justify-end">
          <span className="font-bold text-gray-900 text-sm">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemContent;
