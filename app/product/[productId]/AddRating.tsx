"use client";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/products/Button";
import { SafeUser } from "@/types";
import StarRating from "@/app/components/products/StarRating";
import {Review, order, Product} from "@/prisma/generated/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const ratingValue = watch("rating");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No Rating Selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(data);
  };

  if (!user || !product) return null;

  const deliveredOrder =
    user?.orders &&
    user?.orders.some(
      (order) =>
        order.products.find((item) => item.id === product.id) &&
        order.deliveryStatus === "delivered"
    );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px] font-bold">
      <Heading title="Rating this Product" />
      <StarRating
        value={ratingValue}
        readOnly={false}
        onChange={(newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading" : "Rating Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
