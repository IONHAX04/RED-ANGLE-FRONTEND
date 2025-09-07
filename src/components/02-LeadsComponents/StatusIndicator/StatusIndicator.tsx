import { UserRoundPlus } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const StatusIndicator: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const stats = [
    {
      label: "New Leads",
      value: 42,
      color: "#1E88E5",
      border: "border-blue-500",
      bg: "bg-blue-100",
    },
    {
      label: "In Contact",
      value: 18,
      color: "#FDD835",
      border: "border-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      label: "Booked",
      value: 9,
      color: "#43A047",
      border: "border-green-500",
      bg: "bg-green-100",
    },
    {
      label: "Lost",
      value: 7,
      color: "#E53935",
      border: "border-red-500",
      bg: "bg-red-100",
    },
    {
      label: "Awaiting Reply",
      value: 15,
      color: "#8E24AA",
      border: "border-purple-500",
      bg: "bg-purple-100",
    },
    {
      label: "Proposal Sent",
      value: 11,
      color: "#FB8C00",
      border: "border-orange-500",
      bg: "bg-orange-100",
    },
  ];

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();

      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: stats.map((s) => s.label),
          datasets: [
            {
              data: stats.map((s) => s.value),
              backgroundColor: stats.map((s) => s.color),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                padding: 15,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [stats]);

  return (
    <div className="p-6">
      <h2 className="text-md font-semibold mb-3">Status Summary</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg border ${item.border} bg-white`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${item.bg}`}>
                <UserRoundPlus className="w-5 h-5" color={item.color} />
              </div>
              <p className="font-medium text-sm">{item.label}</p>
            </div>
            <p className="font-bold text-gray-700">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mt-8 shadow-md border rounded-lg p-6 bg-white">
        <h3 className="mb-4 font-semibold text-md">Status Distribution</h3>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <canvas ref={chartRef} className="max-w-[400px] max-h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;
