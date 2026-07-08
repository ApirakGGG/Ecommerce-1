import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrderByld";
import NullData from "@/app/components/NullData";
import OrderDetails from "./OrderDetails";

interface IPrams {
  orderId?: string;
  ordertId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title="No Order" />;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
