"use client";
import { formatPrice } from "@/untils/formatPrice";
import StarRating from "@/app/components/products/StarRating";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    (data.reviews.length || 1);

  return (
    <div
      onClick={() => router.push(`product/${data.id}`)}
      className="group col-span-1 cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          fill
          src={data.images[0].image}
          alt={data.name}
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {data.inStock ? (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-red-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
            Sold Out
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-1.5 p-4 border-t border-gray-50">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
          {data.brand}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {data.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating value={productRating} size="small" precision={0.5} />
          <span className="text-xs text-gray-400">
            ({data.reviews.length})
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(data.price)}
          </span>
          <span className="text-xs text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
