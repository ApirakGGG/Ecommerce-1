/* eslint-disable @next/next/no-img-element */
import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IproductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

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
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-6 px-4 md:px-8 flex flex-col gap-16">

          {/* ── Hero Banner ── */}
          <HomeBanner />

          {/* ── Products Section ── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Featured Products
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Explore our latest lineup
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                {products.length} items
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
              {shuffledProducts.map((product: any) => (
                <ProductCard data={product} key={product.id} />
              ))}
            </div>
          </section>

          {/* ── About Apple Card ── */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-slate-800 shadow-xl">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-0">
              {/* Image */}
              <div className="md:w-56 md:h-56 w-full h-48 relative flex-shrink-0">
                <img
                  className="w-full h-full object-cover md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none"
                  src="/image.png"
                  alt="Apple"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col gap-3 p-8 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  About
                </span>
                <h3 className="text-2xl font-black leading-tight">
                  Apple Inc.
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  An American multinational technology company headquartered in
                  Cupertino, California. As of 2023, Apple is the world&apos;s
                  largest company by market capitalization, with US$394.3 billion
                  in 2022 revenue.
                </p>
                <a
                  href="https://apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 self-start text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
}
