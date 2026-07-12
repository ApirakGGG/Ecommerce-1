import Container from "../components/Container";
import ProductCard from "../components/products/ProductCard";
import getProducts from "@/actions/getProducts";
import NullData from "../components/NullData";

export const dynamic = 'force-dynamic'

export default async function Products() {
  const products = await getProducts({ category: null });

  if (products.length === 0) {
    return <NullData title='Oops! No product found.' />;
  }

  // Create categorized groups dynamically
  const groupedProducts: Record<string, any[]> = {};
  products.forEach((product: any) => {
    // Determine category properly or fallback
    const cat = product.category || "อื่นๆ (Others)";
    if (!groupedProducts[cat]) {
      groupedProducts[cat] = [];
    }
    groupedProducts[cat].push(product);
  });

  return (
    <div className="min-h-screen bg-[#fdf8f3] py-12">
      <Container>
        <div className="flex flex-col gap-10">
          
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-[#4a3b2c] tracking-tight mb-4">สินค้าทั้งหมด</h1>
            <p className="text-[#a0856a] max-w-xl mx-auto">
              เลือกดูสินค้าทั้งหมดของเรา ซึ่งถูกแบ่งหมวดหมู่ไว้เพื่อให้คุณค้นหาได้ง่ายยิ่งขึ้น
            </p>
          </div>

          {Object.entries(groupedProducts)
            .sort(([catA], [catB]) => catA.localeCompare(catB))
            .map(([category, items]) => (
            <div key={category} className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-lg shadow-[#e8ddd3]/40 border border-[#e8ddd3]/60 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#e8ddd3]/80">
              
              <div className="flex items-center gap-4 mb-8 border-b border-[#e8ddd3] pb-4">
                <div className="w-1.5 h-8 bg-[#a0856a] rounded-full shadow-sm shadow-[#a0856a]/30"></div>
                <h2 className="text-2xl font-bold text-[#4a3b2c] capitalize tracking-tight">{category}</h2>
                <span className="text-xs font-bold bg-[#fdf8f3] text-[#a0856a] px-3 py-1.5 rounded-full border border-[#e8ddd3] uppercase tracking-widest ml-auto">
                  {items.length} สินค้า
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((product) => (
                  <ProductCard data={product} key={product.id} />
                ))}
              </div>

            </div>
          ))}

        </div>
      </Container>
    </div>
  );
}
