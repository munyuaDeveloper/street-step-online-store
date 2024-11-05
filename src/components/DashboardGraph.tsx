
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import React from "react";
import { Data } from "../common/GraphData";

Chart.register(CategoryScale);
const DashboardGraph = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Sales",
        data: Data.map((data) => data.sales),
        borderColor: "#f1bef9",
        backgroundColor: ["e879fa"],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  });
  return (
    <div className="bg-white shadow-lg mt-12 p-5 h-[75%]">
      <h2 className="text-2xl">Sales Visuals</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sales Between Jan 2024 - July 2024",
            },
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default DashboardGraph;
