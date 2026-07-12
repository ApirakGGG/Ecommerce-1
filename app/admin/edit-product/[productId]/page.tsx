import Container from "@/app/components/Container";
import EditProductForm from "./EditProductForm";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IPrams {
  productId?: string;
}

const EditProduct = async ({ params }: { params: IPrams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  // Next.js 15+ sometimes requires params to be awaited if they are used like a promise, but in Next 13 it's sync. getProductById handles it.
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="Oops! Product with the given id does not exist" />;
  }

  return (
    <div className="p-8">
      <Container>
        <EditProductForm product={product} />
      </Container>
    </div>
  );
};

export default EditProduct;
