"use client";

import { Product } from "@/prisma/generated/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/untils/formatPrice";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDns, MdDone, MdLibraryAdd, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import Link from "next/link";

interface ManageProductsClientProps {
  products: Product[];
}

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

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
      quantity: product.quantity
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <div className="font-semibold text-[#4a3b2c]">{params.row.price}</div>
      ),
    },
    { field: "category", headerName: "Category", width: 110 },
    { field: "brand", headerName: "Brand", width: 110 },
    {
      field: "inStock",
      headerName: "Stock",
      width: 120,
      renderCell: (params) => (
        <div>
          {params.row.quantity > 0 ? (
            <Status text="in stock" icon={MdDone} bg="bg-gray-100" color="text-gray-700" />
          ) : (
            <Status text="out of stock" icon={MdClose} bg="bg-gray-200" color="text-gray-600" />
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {/* <ActionBtn icon={MdCached} onClick={() => handleToggleStock(params.row.id, params.row.inStock)} /> */}
          <ActionBtn icon={MdDelete} onClick={() => handleDelete(params.row.id, params.row.images)} />
          <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/product/${params.row.id}`)} />
        </div>
      ),
    },
  ];

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios.put("/api/product", { id, inStock: !inStock })
        .then(() => { toast.success("Product status changed"); router.refresh(); })
        .catch(() => toast.error("Oops! Something went wrong"));
    }, [router]
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Deleting product, please wait…");
      try {
        for (const item of images ?? []) {
          if (item.image) { await deleteObject(ref(storage, item.image)); }
        }
      } catch (e) { console.log("Delete images error", e); }
      axios.delete(`/api/product/${id}`)
        .then(() => { toast.success("Product deleted"); router.refresh(); })
        .catch(() => toast.error("Failed to delete product"));
    }, [router, storage]
  );

  return (
    <div className="max-w-[1350px] mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-[#e8ddd3]">
            <MdDns className="text-[#a0856a] text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4a3b2c]">Manage Products</h1>
            <p className="text-xs text-[#a0856a]">{rows.length} products total</p>
          </div>
        </div>
        <Link href="/admin/add-products">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#e8ddd3] text-[#4a3b2c] text-sm font-medium hover:bg-[#fdf8f3] hover:border-[#d6c4b0] transition-all shadow-sm">
            <MdLibraryAdd size={15} />
            Add Product
          </button>
        </Link>
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

export default ManageProductsClient;
