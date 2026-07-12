"use client";
import React, { useState } from "react";
import StarRating from "@/app/components/products/StarRating";
import Image from "next/image";
import moment from "moment";
import { SafeUser } from "@/types";
import { MdEdit, MdDelete, MdClose, MdCheck } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/app/components/products/Button";
import Input from "@/app/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { useDropzone } from "react-dropzone";

interface ListRatingProps {
  product: any;
  user: SafeUser | null | any;
}

const ListRating: React.FC<ListRatingProps> = ({ product, user }) => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
      image: null,
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

  const startEdit = (review: any) => {
    setEditingId(review.id);
    setCustomValue("comment", review.comment);
    setCustomValue("rating", review.rating);
    setCustomValue("image", review.image);
    setSelectedFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
    setSelectedFile(null);
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsDeleting(reviewId);
    try {
      await axios.delete(`/api/review/${reviewId}`);
      toast.success("Review deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete review");
    } finally {
      setIsDeleting(null);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (!editingId) return;
    setIsUpdating(true);

    if (data.rating === 0) {
      setIsUpdating(false);
      return toast.error("Please provide a rating");
    }

    try {
      let imageUrl = data.image;

      if (selectedFile) {
        toast("Uploading new image...");
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

      await axios.put(`/api/review/${editingId}`, {
        ...data,
        image: imageUrl,
      });

      toast.success("Review updated successfully");
      setEditingId(null);
      setSelectedFile(null);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update review");
    } finally {
      setIsUpdating(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  if (product?.reviews?.length === 0) return null;

  return (
    <div className="text-sm mt-2">
      {product?.reviews &&
        product.reviews.map((review: any) => {
          const isOwner = user?.id === review.userId;
          const isAdmin = user?.role === "ADMIN";
          const canManage = isOwner || isAdmin;
          const isEditingThis = editingId === review.id;

          if (isEditingThis) {
            return (
              <div key={review.id} className="max-w-[500px] border p-4 rounded-xl mb-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-bold">Edit Review</div>
                  <button onClick={cancelEdit} className="text-gray-500 hover:text-red-500">
                    <MdClose size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  <StarRating
                    value={ratingValue}
                    readOnly={false}
                    onChange={(val) => setCustomValue("rating", val)}
                  />
                  <Input
                    id="comment"
                    label="Comment"
                    disabled={isUpdating}
                    register={register}
                    errors={errors}
                    required
                  />
                  
                  <div className="mt-2 text-sm font-medium">Update Photo (Optional)</div>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-slate-300 p-4 rounded-lg cursor-pointer text-center text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    <input {...getInputProps()} />
                    {selectedFile ? (
                      <div className="text-green-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis px-2">
                        {selectedFile.name}
                      </div>
                    ) : isDragActive ? (
                      <p>Drop the image here...</p>
                    ) : (
                      <p>Click or drag image to upload a new one</p>
                    )}
                  </div>
                  {(!selectedFile && watch("image")) && (
                    <div className="text-xs text-gray-500 block">Current image will be kept.</div>
                  )}

                  <div className="mt-2">
                    <Button
                      label={isUpdating ? "Updating..." : "Save Changes"}
                      onClick={handleSubmit(onSubmit)}
                      disabled={isUpdating}
                    />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={review.id} className="max-w-[500px] mb-6">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {review.user.image ? (
                      <Image
                        src={review.user.image}
                        fill
                        alt={review.user.name}
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-gray-500 text-sm font-bold">
                        {review.user.name?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>
                  <div className="font-semibold">{review.user.name}</div>
                  <div className="font-light text-gray-500 text-xs">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                
                {canManage && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(review)}
                      className="p-2 text-slate-500 hover:text-[#a0856a] hover:bg-slate-100 rounded-full transition-colors tooltip"
                      title="Edit Review"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={isDeleting === review.id}
                      className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors tooltip"
                      title="Delete Review"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-2">
                <StarRating value={review.rating} readOnly />
                <div className="ml-2 mt-1">{review.comment}</div>
                
                {review.image && (
                  <div className="mt-3 relative w-full h-40 max-w-[300px] rounded-lg overflow-hidden border border-gray-200 ml-2">
                    <Image
                      src={review.image}
                      fill
                      alt="Review image"
                      className="object-cover"
                    />
                  </div>
                )}
                
                <hr className="mt-4 mb-4 border-gray-200" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListRating;
