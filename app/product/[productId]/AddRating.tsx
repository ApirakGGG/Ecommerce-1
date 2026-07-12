"use client";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/products/Button";
import { SafeUser } from "@/types";
import StarRating from "@/app/components/products/StarRating";
import { Review, order, Product } from "@/prisma/generated/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No Rating Selected");
    }

    try {
      let imageUrl = null;

      if (selectedFile) {
        toast("Uploading image...");
        const fileName = new Date().getTime() + "-" + selectedFile.name;
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `reviews/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  imageUrl = url;
                  resolve();
                })
                .catch(reject);
            }
          );
        });
      }

      const ratingData = { ...data, image: imageUrl, userId: user?.id, product: product };

      await axios.post("/api/rating", ratingData);
      
      toast.success("Rating submitted");
      setSelectedFile(null);
      reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
      
      <div className="mt-2 text-sm">Add Photo (Optional)</div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 rounded-lg cursor-pointer text-center transition-colors ${
          isDragActive ? "border-[#a0856a] bg-[#fdf8f3]" : "border-slate-300 text-slate-500 hover:bg-slate-50"
        }`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="text-green-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis px-2">
            {selectedFile.name}
          </div>
        ) : isDragActive ? (
          <p className="text-[#a0856a]">Drop the image here...</p>
        ) : (
          <p>Click or drag image to upload</p>
        )}
      </div>

      <div className="mt-4">
        <Button
          label={isLoading ? "Uploading..." : "Rating Product"}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default AddRating;
