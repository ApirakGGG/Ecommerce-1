import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Avatar from "../components/avatar";
import Heading from "../components/Heading";
import Link from "next/link";

const Profiles = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div>
        <div className="px-4 sm:px-0">
          <Heading title="Profile Information" />
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className=" gap-5 md:gap-0 mb-5 mt-3">
          <Avatar src={currentUser?.image} />
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.name}
                {/* Fix for edit button*/}
                <Link
                  className="ml-6  border-4 rounded-md text-sm font-semibold"
                  href={`/updateUser/${currentUser?.id}`}
                >
                  EDIT USER
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                PassWord
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                ***********
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                User ID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Create At
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.createAt}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Update At
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {currentUser?.updateAT}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                TAG Status
              </dt>
              <button className="bg-slate-400 border border-slate-500 rounded-md font-bold">
                <dd className="mt-1 text-sm leading-6 text-gray-900 sm:col-span-2 sm:mt-0 border border-slate-500 rounded-md">
                  {currentUser?.role}
                </dd>
              </button>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  );
};

export default Profiles;
