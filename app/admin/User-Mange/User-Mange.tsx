"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { User } from "@/prisma/generated/client";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import moment from "moment";
import { useCallback } from "react";
import axios from "axios";
import ActionBtn from "@/app/components/ActionBtn";

interface ManageUserClientProps {
  users: ExtendedUser[];
}

type ExtendedUser = User & {
  user: User;
};

const ManageUserClient: React.FC<ManageUserClientProps> = ({ users }) => {
  const router = useRouter();

  let rows: any = [];
  if (users) {
    rows = users.map((user) => {
      const formattedUser = {
        id: user.id,
        email: user.email,
        username: user.name,
        createDate: moment(user.createAt).fromNow(),
        Status: user.role,
      };

      return formattedUser;
    });
  }
  console.log("Rows:", rows);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", type: "string", width: 240 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "username", headerName: "User Name", width: 400 },
    { field: "createDate", headerName: "Date", width: 250 },
    { field: "Status", headerName: "Status", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 240,
      renderCell: (params) => (
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdDelete}
            onClick={() => {
              handleDelete(params.row.id);
            }}
          />
        </div>
      ),
    },
    // ... (rest of the columns)
  ];

  const handleDelete = useCallback(
    async (id: string) => {
      toast("Delete, please wait!");

      axios
        .delete(`/api/users/${id}`)
        .then((res) => {
          toast.success("users deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to delete users");
          console.log(err);
        });
    },
    [router]
  );
  return (
    <div className="max-w-[1450px] m-auto text-xl justify-between">
      <div mb-4 mt-8>
        <Heading title="Manage Users" />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageUserClient;
