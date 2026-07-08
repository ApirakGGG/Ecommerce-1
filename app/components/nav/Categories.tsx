'use client'
import { categories } from "@/untils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="bg-white border-t border-gray-100">
      <Container>
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label || (category === null && item.label === 'All')}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
