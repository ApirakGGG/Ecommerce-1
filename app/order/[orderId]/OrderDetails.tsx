"use client";
import Status from "@/app/components/Status";
import { formatPrice } from "@/untils/formatPrice";
import { order } from "@/prisma/generated/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Order Details</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">{order.id}</p>
        </div>
        <span className="text-xs text-gray-400">{moment(order.createDate).fromNow()}</span>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-2 gap-5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Total Amount</p>
          <p className="text-2xl font-black text-gray-900">{formatPrice(order.amount)}</p>
          <p className="text-xs text-gray-400 uppercase mt-0.5">{order.currency}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Payment</p>
            {order.status === "pending" ? (
              <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-amber-50" color="text-amber-600" />
            ) : (
              <Status text="Completed" icon={MdDone} bg="bg-emerald-50" color="text-emerald-600" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Delivery</p>
            {order.deliveryStatus === "pending" ? (
              <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-amber-50" color="text-amber-600" />
            ) : order.deliveryStatus === "dispatched" ? (
              <Status text="Dispatched" icon={MdDeliveryDining} bg="bg-blue-50" color="text-blue-600" />
            ) : (
              <Status text="Delivered" icon={MdDone} bg="bg-emerald-50" color="text-emerald-600" />
            )}
          </div>
        </div>

        {/* Payment intent */}
        <div className="col-span-2 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Payment Reference</p>
          <p className="text-xs font-mono text-gray-500 break-all">{order.paymentIntentId}</p>
        </div>
      </div>

      {/* Products list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Items Ordered</h2>

        {/* Table headers */}
        <div className="hidden md:grid grid-cols-[1fr_80px_80px_80px] gap-4 text-xs text-gray-400 uppercase tracking-widest font-medium pb-2 border-b border-gray-100">
          <div>Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Total</div>
        </div>

        {order.products?.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}

        {/* Grand total */}
        <div className="flex justify-end pt-4 border-t border-gray-100 mt-2">
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Grand Total</p>
            <p className="text-xl font-black text-gray-900">{formatPrice(order.amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
