"use client";
import { Product, User, order } from "@/prisma/generated/client";
import { useEffect, useState } from "react";
import { formatPrice } from "@/untils/formatPrice";
import { formatNumber } from "@/untils/formatNumer";

interface SummatyProps {
  orders: order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
    icon: string;
    color: string;
    bg: string;
    border: string;
  };
};

const Summary: React.FC<SummatyProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Revenue",
      digit: 0,
      icon: "💰",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
    products: {
      label: "Total Products",
      digit: 0,
      icon: "📦",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
    orders: {
      label: "Total Orders",
      digit: 0,
      icon: "🛒",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
      icon: "✅",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
      icon: "⏳",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
    users: {
      label: "Total Users",
      digit: 0,
      icon: "👤",
      color: "text-[#4a3b2c]",
      bg: "bg-white",
      border: "border-[#e8ddd3]",
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        return item.status === "complete" ? acc + item.amount : acc;
      }, 0);
      const paidOrders = orders.filter((o) => o.status === "complete");
      const unpaidOrders = orders.filter((o) => o.status === "pending");
      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;
      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1350px] m-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-7 w-0.5 rounded-full bg-[#a0856a]" />
        <h2 className="text-xl font-bold text-[#4a3b2c]">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {summaryKeys.map((key) => {
          const item = summaryData[key];
          return (
            <div
              key={key}
              className={`
                relative rounded-xl border p-4 flex flex-col gap-2
                transition-all duration-200 hover:border-[#d6c4b0] hover:shadow-sm
                ${item.bg} ${item.border}
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className={`text-lg font-bold ${item.color}`}>
                {item.label === "Total Revenue"
                  ? formatPrice(item.digit)
                  : formatNumber(item.digit)}
              </div>
              <div className="text-xs text-[#a0856a] font-medium">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
