"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GraphData[];
}

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const labels = data.map((item) => item.day);
  const amount = data.map((item) => item.totalAmount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue (฿)",
        data: amount,
        backgroundColor: "rgba(160, 133, 106, 0.5)",
        borderColor: "rgba(160, 133, 106, 0.8)",
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#a0856a",
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "#fdf8f3",
        titleColor: "#4a3b2c",
        bodyColor: "#7a5c3a",
        borderColor: "#e8ddd3",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#a0856a" },
        grid: { color: "rgba(160, 133, 106, 0.1)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#a0856a" },
        grid: { color: "rgba(160, 133, 106, 0.1)" },
      },
    },
  };

  return (
    <div className="rounded-xl border border-[#e8ddd3] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-0.5 rounded-full bg-[#a0856a]" />
        <h3 className="text-sm font-bold text-[#4a3b2c]">Weekly Revenue</h3>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
