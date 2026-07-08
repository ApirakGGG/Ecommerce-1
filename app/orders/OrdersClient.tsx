"use client";

import { User, order } from "@/prisma/generated/client";
import { formatPrice } from "@/untils/formatPrice";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-400 mt-1">{orders.length} order{orders.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <div>Customer</div>
          <div>Amount</div>
          <div>Payment</div>
          <div>Delivery</div>
          <div>Date</div>
          <div className="text-center">View</div>
        </div>

        {/* Rows */}
        {orders.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center"
            >
              {/* Customer */}
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">{order.user.name}</p>
                <p className="text-xs font-mono text-gray-400 truncate">{order.id.slice(0, 16)}...</p>
              </div>

              {/* Amount */}
              <div className="text-sm font-bold text-gray-900">
                {formatPrice(order.amount)}
              </div>

              {/* Payment Status */}
              <div>
                {order.status === "pending" ? (
                  <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-amber-50" color="text-amber-600" />
                ) : (
                  <Status text="Done" icon={MdDone} bg="bg-emerald-50" color="text-emerald-600" />
                )}
              </div>

              {/* Delivery Status */}
              <div>
                {order.deliveryStatus === "pending" ? (
                  <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-amber-50" color="text-amber-600" />
                ) : order.deliveryStatus === "delivered" ? (
                  <Status text="Delivered" icon={MdDone} bg="bg-emerald-50" color="text-emerald-600" />
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500">
                {moment(order.createDate).fromNow()}
              </div>

              {/* View action */}
              <div className="flex justify-center">
                <button
                  onClick={() => router.push(`/order/${order.id}`)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 transition-colors"
                  title="View Order"
                >
                  <MdRemoveRedEye size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersClient;
