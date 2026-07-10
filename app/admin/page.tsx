import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import BarGraph from "./manage-products/BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <Summary products={products} orders={orders} users={users} />
      <div className="mt-6 pb-12">
        <BarGraph data={graphData} />
      </div>
    </div>
  );
};

export default Admin;

