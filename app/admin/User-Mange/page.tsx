import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getUsers";
import ManageUserClient from "./User-Mange";

const ManageUser = async () => {
  const users = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageUserClient users={users as any}  />;
      </Container>
    </div>
  );
};

export default ManageUser;
