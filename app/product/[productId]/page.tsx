import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
interface IPrams {
  productId?: string;
}

const Product = async ({ params }: { params: IPrams }) => {

  const product = await getProductById(params)
const user = await getCurrentUser()

  if(!product) return <NullData title="Oops! Product with the given id does not exist" />

  return (
    <div className="p-8 ">
      <Container>
        {user?.role === 'ADMIN' && (
          <div className="flex justify-end mb-4">
            <Link 
              href={`/admin/edit-product/${product.id}`}
              className="bg-[#a0856a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#7a5c3a] transition-all flex items-center gap-2 shadow-sm"
            >
              <MdEdit size={18} />
              แก้ไขสินค้า 
            </Link>
          </div>
        )}
        <ProductDetails product={product as any} id={params as string}  />
        <div className="flex flex-col mt-20 gap-4">
          <div className="font-bold">ADD Rating</div>
          <AddRating product={product} user={user} />
          <ListRating product={product} user={user} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
