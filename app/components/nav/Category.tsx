'use client'

import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string"

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if (label === 'ทั้งหมด') { //pathname แรก
      router.push('/')
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString())
      }
      const updatedQuery: any = { ...currentQuery, category: label }
      const url = queryString.stringifyUrl(
        { url: '/', query: updatedQuery },
        { skipNull: true }
      )
      router.push(url)
    }
  }, [label, params, router])

  return (
    <button
      onClick={handleClick}
      // {/* เพิ่ม class `group` เข้าไปที่ปุ่ม เพื่อให้ลูกๆ เช็กสถานะ hover ของปุ่มนี้ได้ */}
      className={`
        group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-300 whitespace-nowrap cursor-pointer
        ${selected
          ? 'bg-[#a0856a] text-white shadow-sm'
          : 'bg-transparent text-[#a0856a] hover:bg-[#f5ebd9] hover:text-[#5c4a3d]'
        }
      `}
    >
      <Icon size={15} />
      
      {/* ซ่อนตัวหนังสือ และจัดการความกว้าง/ความโปร่งใสให้สมูทตอน hover */}
      <span className="max-w-0 opacity-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-w-[150px] group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
};

export default Category;