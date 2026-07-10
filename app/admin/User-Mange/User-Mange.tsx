"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdAccountBox, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { User } from "@/prisma/generated/client";
import { useRouter } from "next/navigation";
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

const datagridSx = {
  border: "none",
  color: "#4a3b2c",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#fdf8f3",
    color: "#a0856a",
    fontWeight: "600",
    fontSize: "0.75rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #e8ddd3",
  },
  "& .MuiDataGrid-row": {
    borderBottom: "1px solid #e8ddd3",
    "&:hover": { backgroundColor: "#fdf8f3" },
  },
  "& .MuiDataGrid-cell": { borderColor: "transparent", color: "#7a5c3a" },
  "& .MuiCheckbox-root": { color: "#a0856a" },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#fdf8f3",
    borderTop: "1px solid #e8ddd3",
    color: "#a0856a",
  },
  "& .MuiTablePagination-root": { color: "#a0856a" },
  "& .MuiDataGrid-selectedRowCount": { color: "#a0856a" },
};

const ManageUserClient: React.FC<ManageUserClientProps> = ({ users }) => {
  const router = useRouter();

  let rows: any = [];
  if (users) {
    rows = users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.name,
      createDate: moment(user.createAt).fromNow(),
      Status: user.role,
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", type: "string", width: 220 },
    { field: "email", headerName: "E-mail", width: 220 },
    { field: "username", headerName: "Username", width: 180 },
    { field: "createDate", headerName: "Joined", width: 160 },
    {
      field: "Status",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#f5ebd9] text-[#7a5c3a] border border-[#e8ddd3]">
          {params.row.Status}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <ActionBtn icon={MdDelete} onClick={() => handleDelete(params.row.id)} />
        </div>
      ),
    },
  ];

  const handleDelete = useCallback(
    async (id: string) => {
      toast("Deleting user, please wait…");
      axios.delete(`/api/users/${id}`)
        .then(() => { toast.success("User deleted"); router.refresh(); })
        .catch(() => toast.error("Failed to delete user"));
    }, [router]
  );

  return (
    <div className="max-w-[1350px] mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-white border border-[#e8ddd3] shadow-sm">
          <MdAccountBox className="text-[#a0856a] text-lg" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#4a3b2c]">Manage Users</h1>
          <p className="text-xs text-[#a0856a]">{rows.length} users registered</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e8ddd3] bg-white overflow-hidden shadow-sm">
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[9, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={datagridSx}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUserClient;
