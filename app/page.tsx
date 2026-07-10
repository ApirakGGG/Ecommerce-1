/* eslint-disable @next/next/no-img-element */
import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IproductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import Categories from "./components/nav/Categories";
import Category from "./components/nav/Category";
import { IconBaseProps } from "react-icons";

interface HomeProps {
  searchParams: IproductParams;
}

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! No product found. Click "All" to clear filter' />
    );
  }

  function shuffleArray(originalArray: any) {
    const array = [...originalArray];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Container>
        <div className="py-6 px-4 md:px-8 flex flex-col gap-16">

          {/* ── Hero Banner ── */}
          <HomeBanner />

          {/* ── Products Section ── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#4a3b2c] tracking-tight">
                  สินค้าแนะนำ
                </h2>
                <p className="text-sm text-[#a0856a] mt-1">
                  พบกับสินค้าล่าสุดของเรา
                </p>
              </div>
              <span className="text-xs text-[#a0856a] bg-[#f5ebd9] px-3 py-1.5 rounded-full font-medium">
                {products.length} items
              </span>
            </div>

            {/* หมวดหมู่ */}
             <Categories />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
              {shuffledProducts.map((product: any) => (
                <ProductCard data={product} key={product.id} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
