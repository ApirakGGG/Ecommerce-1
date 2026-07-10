"use client";

import { User, order } from "@/prisma/generated/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/untils/formatPrice";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDelete,
  MdDeliveryDining,
  MdDone,
  MdFormatListBulleted,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { deleteObject, ref } from "firebase/storage";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = order & {
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
  "& .MuiDataGrid-toolbarContainer": { backgroundColor: "#fdf8f3" },
  "& .MuiDataGrid-selectedRowCount": { color: "#a0856a" },
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => ({
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount),
      paymentStatus: order.status,
      date: moment(order.createDate).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer", width: 160 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => (
        <div className="font-semibold text-[#4a3b2c]">{params.row.amount}</div>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 140,
      renderCell: (params) => (
        <div>
          {params.row.paymentStatus === "pending" ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-gray-200" color="text-gray-600" />
          ) : (
            <Status text="completed" icon={MdDone} bg="bg-gray-100" color="text-gray-700" />
          )}
        </div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery",
      width: 140,
      renderCell: (params) => (
        <div>
          {params.row.deliveryStatus === "pending" ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-gray-200" color="text-gray-600" />
          ) : params.row.deliveryStatus === "delivered" ? (
            <Status text="delivered" icon={MdDone} bg="bg-gray-100" color="text-gray-700" />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <ActionBtn icon={MdDeliveryDining} onClick={() => handleDispatch(params.row.id)} />
          <ActionBtn icon={MdDone} onClick={() => handleDeliver(params.row.id)} />
          <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/order/${params.row.id}`)} />
          <ActionBtn icon={MdDelete} onClick={() => handleDelete(params.row.id, params.row.images)} />
        </div>
      ),
    },
  ];

  const handleDispatch = useCallback(
    (id: string) => {
      axios.put("/api/order", { id, paymentStatus: "complete" })
        .then(() => { toast.success("Order Dispatched"); router.refresh(); })
        .catch(() => toast.error("Oops! Something went wrong"));
    }, [router]
  );

  const handleDeliver = useCallback(
    (id: string) => {
      axios.put("/api/order", { id, deliveryStatus: "delivered" })
        .then(() => { toast.success("Order Delivered"); router.refresh(); })
        .catch(() => toast.error("Oops! Something went wrong"));
    }, [router]
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Deleting order, please wait…");
      try {
        for (const item of images ?? []) {
          if (item.image) { await deleteObject(ref(item.image)); }
        }
      } catch (e) { console.log("Delete images error", e); }
      axios.delete(`/api/order/${id}`)
        .then(() => { toast.success("Order deleted"); router.refresh(); })
        .catch(() => toast.error("Failed to delete order"));
    }, [router]
  );

  return (
    <div className="max-w-[1350px] mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-[#e8ddd3]">
            <MdFormatListBulleted className="text-[#a0856a] text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4a3b2c]">Manage Orders</h1>
            <p className="text-xs text-[#a0856a]">{rows.length} orders total</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5ebd9] text-[#7a5c3a] border border-[#e8ddd3]">
          {orders.filter((o) => o.status === "pending").length} pending
        </span>
      </div>

      <div className="rounded-xl border border-[#e8ddd3] bg-white overflow-hidden shadow-sm">
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 9 } } }}
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

export default ManageOrdersClient;
