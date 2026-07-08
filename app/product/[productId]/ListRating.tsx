"use client";
import StarRating from "@/app/components/products/StarRating";
import Image from "next/image";
import moment from "moment";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if(product.reviews.length === 0) return null
  return (
    <div className="text-sm mt-2">
      {product.reviews &&
        product.reviews.map((review: any) => {
          return (
            <div key={review.id} className="max-w-300px">
              <div className="flex gap-2 items-center">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {review.user.image ? (
                    <Image src={review.user.image} fill alt={review.user.name} className="object-cover" />
                  ) : (
                    <span className="flex items-center justify-center w-full h-full text-gray-500 text-sm font-bold">
                      {review.user.name?.[0]?.toUpperCase() ?? "?"}
                    </span>
                  )}
                </div>
                <div className="font-semibold">{review.user.name}</div>
                <div className="font-light">
                  {moment(review.createdDate).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <StarRating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="mt-4 mb-4" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListRating;
