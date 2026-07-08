"use client";

import { User, order } from "@/prisma/generated/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/untils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDelete,
  MdDeliveryDining,
  MdDone,
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

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      const formattedOrder = {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };

      return formattedOrder;
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 240 },
    { field: "customer", headerName: "Customer Name", width: 190 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            )}
          </div>
        );
      },
    },

    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-yellow-200"
                color="text-yellow-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },

    {
      field: "action",
      headerName: "Action",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full;">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                console.log("orderId:");
                router.push(`/order/${params.row.id}`);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          paymentStatus: "complete",
        })
        .then((res) => {
          console.log("Dispatch Response:", res.data);
          toast.success("Order Dispatched");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong");
          console.log(err);
        });
    },
    [router],
  );

  const handleDeliver = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "delivered",
        })
        .then((res) => {
          toast.success("Order Delivered");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong");
          console.log(err);
        });
    },
    [router],
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Delete, please wait!");

      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(item.image);
              await deleteObject(imageRef);
              console.log("image deleted", item.image);
            }
          }
        } catch (error) {
          return console.log("Delete images error", error);
        }
      };

      await handleImageDelete();

      axios
        .delete(`/api/order/${id}`)
        .then((res) => {
          toast.success("Order deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to delete order");
          console.log(err);
        });
    },
    [router],
  );

  return (
    <div className="max-w-[1350px] m-auto text-xl justify-between">
      <div mb-4 mt-8>
        <Heading title="Manage Orders" />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
