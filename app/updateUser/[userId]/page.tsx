// pages/index.tsx
import type { NextPage } from "next";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import UpdateUserNameForm from "./edituser";

const Home: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }
  return (
    <div>
      <main className="h-screen">
        <h1 className="text-6xl text-center my-10">
          UPDATE <span className="text-blue-500">USER</span>
        </h1>
        <div className="container mx-auto my-10 max-w-7xl cpx-4 sm:px-6 lg:px-60">
          <UpdateUserNameForm />
        </div>
      </main>
    </div>
  );
};
export default Home;
