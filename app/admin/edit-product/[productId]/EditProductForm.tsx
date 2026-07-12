"use client";

import CategoriesInput from "@/app/components/inputs/CategoriesInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdLibraryAdd, MdInventory, MdCategory, MdPalette, MdCheckCircle, MdAdd, MdClose } from "react-icons/md";
import Link from "next/link";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | string | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const SectionCard = ({
  step,
  title,
  icon: Icon,
  children,
  actionButton,
}: {
  step: number;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}) => (
  <div className="rounded-xl border border-[#e8ddd3] bg-white overflow-hidden shadow-sm">
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8ddd3] bg-[#fdf8f3]">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#a0856a] text-white text-xs font-bold flex-shrink-0">
          {step}
        </div>
        <Icon className="text-[#a0856a] text-base flex-shrink-0" />
        <h2 className="text-[#4a3b2c] font-bold text-sm">{title}</h2>
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const EditProductForm = ({ product }: { product: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(product?.images || null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();

  // Dynamic Data States
  const [dbCategories, setDbCategories] = useState<{ id: string; label: string; icon: string | null }[]>([]);
  const [dbColors, setDbColors] = useState<{ id: string; color: string; colorCode: string }[]>([]);

  // Add Category States
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("📦");

  // Add Color States
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      brand: product?.brand || "",
      category: product?.category || "",
      inStock: product?.inStock || false,
      images: product?.images || [],
      price: product?.price || "",
    },
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setDbCategories(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchColors = async () => {
    try {
      const res = await axios.get("/api/color");
      setDbColors(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchCategories();
    fetchColors();
  }, []);

  const handleAddCategory = async () => {
    if (!newCatLabel) return toast.error("กรุณาระบุชื่อหมวดหมู่");
    try {
      await axios.post("/api/category", { label: newCatLabel, icon: newCatIcon || "📦" });
      toast.success("เพิ่มหมวดหมู่สำเร็จ");
      setNewCatLabel("");
      setNewCatIcon("📦");
      setIsAddingCategory(false);
      fetchCategories();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleAddColor = async () => {
    if (!newColorName || !newColorCode) return toast.error("กรุณาระบุข้อมูลสีให้ครบ");
    try {
      await axios.post("/api/color", { color: newColorName, colorCode: newColorCode });
      toast.success("เพิ่มสีสำเร็จ");
      setNewColorName("");
      setNewColorCode("#000000");
      setIsAddingColor(false);
      fetchColors();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleDeleteCategory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้?")) return;
    try {
      await axios.delete(`/api/category?id=${id}`);
      toast.success("ลบหมวดหมู่สำเร็จ");
      fetchCategories();
      const deletedCat = dbCategories.find(c => c.id === id);
      if (category === deletedCat?.label) {
        setCustomValue("category", "");
      }
    } catch (e: any) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
    }
  };

  const handleDeleteColor = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบสีนี้?")) return;
    try {
      await axios.delete(`/api/color?id=${id}`);
      toast.success("ลบสีสำเร็จ");
      fetchColors();
      
      // Remove from selected images state if present
      const deletedColor = dbColors.find(c => c.id === id);
      if (deletedColor && images) {
        setImages(prev => prev ? prev.filter(i => i.color !== deletedColor.color) : prev);
      }
    } catch (e: any) {
      toast.error("เกิดข้อผิดพลาดในการลบสี");
    }
  };

  useEffect(() => {
    setCustomValue("images", images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("กรุณาเลือก Category");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("กรุณาเลือกรูปภาพอย่างน้อย 1 รูป");
    }

    const handleImageUploads = async () => {
      toast("กำลังสร้างสินค้า กรุณารอสักครู่...");
      try {
        for (const item of data.images) {
          if (item.image) {
            if (typeof item.image === "string") {
              uploadedImages.push({ 
                color: item.color,
                colorCode: item.colorCode,
                image: item.image 
              });
            } else {
              const fileName = new Date().getTime() + "-" + item.image.name;
              const storage = getStorage(firebaseApp);
              const storageRef = ref(storage, `products/${fileName}`);
              const uploadTask = uploadBytesResumable(storageRef, item.image);
              await new Promise<void>((resolve, reject) => {
                uploadTask.on("state_changed", () => {},
                  (error) => { console.log("Upload error", error); reject(error); },
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                      .then((url) => { 
                        uploadedImages.push({ 
                          color: item.color,
                          colorCode: item.colorCode,
                          image: url 
                        }); 
                        resolve(); 
                      })
                      .catch(reject);
                  }
                );
              });
            }
          }
        }
      } catch {
        setIsLoading(false);
        return toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
      }
    };

    await handleImageUploads();
    axios.put(`/api/product/${product.id}`, { ...data, images: uploadedImages })
      .then(() => {
        toast.success("อัปเดตสินค้าสำเร็จ");
        setIsProductCreated(true);
        router.push("/admin/manage-products");
      })
      .catch(() => toast.error("เกิดข้อผิดพลาดในการบันทึกสินค้า"))
      .finally(() => setIsLoading(false));
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => (!prev ? [value] : [...prev, value]));
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => prev ? prev.filter((i) => i.color !== value.color) : prev);
  }, []);

  const uploadedCount = images?.filter((i) => i.image !== null).length ?? 0;

  return (
    <div className="max-w-[860px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-[#e8ddd3] shadow-sm">
            <MdLibraryAdd className="text-[#a0856a] text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4a3b2c]">Edit Product</h1>
            <p className="text-xs text-[#a0856a]">แก้ไขข้อมูลสินค้าให้ถูกต้อง</p>
          </div>
        </div>
        <Link href="/admin/manage-products">
          <button className="px-4 py-2 rounded-lg text-sm text-[#7a5c3a] border border-[#e8ddd3] hover:border-[#d6c4b0] hover:bg-[#fdf8f3] hover:text-[#4a3b2c] transition-all bg-white shadow-sm">
            ← กลับ
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {/* Step 1 */}
        <SectionCard step={1} title="ข้อมูลพื้นฐาน (Basic Information)" icon={MdInventory}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="name" label="ชื่อสินค้า *" disabled={isLoading} register={register} errors={errors} required />
            <Input id="price" label="ราคา (Price) *" disabled={isLoading} register={register} errors={errors} type="number" required />
            <Input id="brand" label="แบรนด์ (Brand) *" disabled={isLoading} register={register} errors={errors} required />
            <div className="flex items-end pb-1">
              <div className="w-full p-3 rounded-lg border border-[#e8ddd3] bg-[#fdf8f3]">
                <CustomCheckBox id="inStock" register={register} label="มีสินค้าในคลัง (In Stock)" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <TextArea id="description" label="คำอธิบายสินค้า (Description) *" disabled={isLoading} register={register} errors={errors} required />
          </div>
        </SectionCard>

        {/* Step 2 */}
        <SectionCard 
          step={2} 
          title="หมวดหมู่สินค้า (Category)" 
          icon={MdCategory}
          actionButton={
            <button 
              onClick={() => setIsAddingCategory(!isAddingCategory)}
              className="flex items-center gap-1 text-xs bg-[#f5ebd9] px-2 py-1 rounded text-[#7a5c3a] hover:bg-[#e8ddd3] transition border border-[#d6c4b0]"
            >
              <MdAdd /> เพิ่มหมวดหมู่
            </button>
          }
        >
          {isAddingCategory && (
            <div className="mb-4 p-4 rounded-xl bg-white border border-[#e8ddd3] shadow-sm flex flex-wrap items-end gap-3">
              <div className="w-20">
                <label className="block text-xs text-[#a0856a] font-medium mb-1">Emoji</label>
                <input 
                  type="text" 
                  value={newCatIcon} 
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f3] border border-[#e8ddd3] rounded-lg text-[#4a3b2c] text-sm focus:outline-none focus:border-[#a0856a] focus:ring-1 focus:ring-[#a0856a] text-center transition-all"
                  placeholder="📦"
                  maxLength={5}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-[#a0856a] font-medium mb-1">ชื่อหมวดหมู่ใหม่</label>
                <input 
                  type="text" 
                  value={newCatLabel} 
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f3] border border-[#e8ddd3] rounded-lg text-[#4a3b2c] text-sm focus:outline-none focus:border-[#a0856a] focus:ring-1 focus:ring-[#a0856a] transition-all"
                  placeholder="เช่น กางเกง"
                />
              </div>
              <button 
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#a0856a] hover:bg-[#7a5c3a] text-white font-medium text-sm rounded-lg transition-colors"
              >
                บันทึก
              </button>
            </div>
          )}
          
          {category && (
            <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#f5ebd9] border border-[#e8ddd3] w-fit">
              <MdCheckCircle className="text-[#a0856a]" size={14} />
              <span className="text-xs text-[#7a5c3a] font-bold">เลือกแล้ว: <span className="text-[#4a3b2c]">{category}</span></span>
            </div>
          )}
          
          {dbCategories.length === 0 ? (
            <p className="text-sm text-[#a0856a] font-medium">ยังไม่มีหมวดหมู่ โปรดเพิ่มหมวดหมู่ก่อน</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {dbCategories.map((item) => (
                <div key={item.id} className="relative group">
                  <div 
                    className="absolute -top-2 -right-2 text-[#a0856a] hover:text-white bg-white hover:bg-red-400 border border-[#e8ddd3] p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all drop-shadow z-10"
                    onClick={(e) => handleDeleteCategory(item.id, e)}
                  >
                    <MdClose size={12} />
                  </div>
                  <CategoriesInput
                    onClick={(cat) => setCustomValue("category", cat)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon || "📦"}
                  />
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Step 3 */}
        <SectionCard 
          step={3} 
          title="สี & รูปภาพสินค้า (Colors & Images)" 
          icon={MdPalette}
          actionButton={
            <button 
              onClick={() => setIsAddingColor(!isAddingColor)}
              className="flex items-center gap-1 text-xs bg-[#f5ebd9] px-2 py-1 rounded text-[#7a5c3a] hover:bg-[#e8ddd3] transition border border-[#d6c4b0]"
            >
              <MdAdd /> เพิ่มสี
            </button>
          }
        >
          {isAddingColor && (
            <div className="mb-4 p-4 rounded-xl bg-white border border-[#e8ddd3] shadow-sm flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs text-[#a0856a] font-medium mb-1">ชื่อสี</label>
                <input 
                  type="text" 
                  value={newColorName} 
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f3] border border-[#e8ddd3] rounded-lg text-[#4a3b2c] text-sm focus:outline-none focus:border-[#a0856a] focus:ring-1 focus:ring-[#a0856a] transition-all"
                  placeholder="เช่น ดำ"
                />
              </div>
              <div>
                <label className="block text-xs text-[#a0856a] font-medium mb-1">รหัสสี (HEX)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={newColorCode} 
                    onChange={(e) => setNewColorCode(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-white border border-[#e8ddd3] p-1"
                  />
                  <span className="text-[#4a3b2c] font-medium text-sm uppercase">{newColorCode}</span>
                </div>
              </div>
              <button 
                onClick={handleAddColor}
                className="px-4 py-2 bg-[#a0856a] hover:bg-[#7a5c3a] text-white font-medium text-sm rounded-lg transition-colors ml-auto"
              >
                บันทึก
              </button>
            </div>
          )}

          <div className="flex items-start gap-3 mb-4 p-3 rounded-lg bg-[#f5ebd9] border border-[#e8ddd3]">
            <span className="text-[#a0856a] text-sm">💡</span>
            <p className="text-xs text-[#7a5c3a] font-medium leading-relaxed">
              เลือกสีสินค้าแล้วอัปโหลดรูปภาพสำหรับแต่ละสี
            </p>
          </div>
          {uploadedCount > 0 && (
            <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#f5ebd9] border border-[#e8ddd3] w-fit">
              <MdCheckCircle className="text-[#a0856a]" size={14} />
              <span className="text-xs text-[#7a5c3a] font-bold">อัปโหลดแล้ว: <span className="text-[#4a3b2c]">{uploadedCount} สี</span></span>
            </div>
          )}
          {dbColors.length === 0 ? (
            <p className="text-sm text-[#a0856a] font-medium">ยังไม่มีตัวเลือกสี โปรดเพิ่มสีก่อน</p>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dbColors.map((item) => (
                <div key={item.id} className="relative group p-1">
                  <div 
                    className="absolute top-0 right-0 text-[#a0856a] hover:text-white bg-white hover:bg-red-400 border border-[#e8ddd3] p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all drop-shadow z-10"
                    onClick={() => handleDeleteColor(item.id)}
                  >
                    <MdClose size={12} />
                  </div>
                  <SelectColor
                    item={{ ...item, image: null }}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageFromState}
                    isProductCreated={isProductCreated}
                  />
                </div>
              ))}
            </div>
          )}
         
        </SectionCard>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-3 rounded-xl text-sm font-semibold transition-all
              ${isLoading
                ? "bg-[#e8ddd3] text-[#a0856a] cursor-not-allowed border border-[#e8ddd3]"
                : "bg-[#4a3b2c] text-white border border-[#4a3b2c] hover:bg-[#5c4a3d] hover:border-[#5c4a3d] shadow-md"
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                กำลังบันทึก...
              </>
            ) : (
              <>
                  <MdLibraryAdd size={16} />
                  อัปเดตสินค้า
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditProductForm;

