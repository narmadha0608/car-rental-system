import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Register components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardChartComponent = ({ data }) => {
  const {
    totalRevenue,
    totalBookings,
    totalUsers,
    totalCars,
    weeklyRevenue,
    weeklyBookings,
  } = data;

  // Pie chart data
  const pieValues = [totalRevenue, totalBookings, totalUsers, totalCars];
  const pieLabels = ["Revenue", "Bookings", "Users", "Cars"];
  const totalSum = pieValues.reduce((sum, val) => sum + val, 0);
  const percentageData = pieValues.map((value) =>
    ((value / totalSum) * 100).toFixed(2)
  );

  const pieData = {
    labels: pieLabels.map(
      (label, i) => `${label} (${percentageData[i]}%)`
    ),
    datasets: [
      {
        data: pieValues,
        backgroundColor: ["#ff512f", "#36d1dc", "#4caf50", "#ffeb3b"],
        hoverBackgroundColor: ["#ff784f", "#58e0f5", "#66bb6a", "#fff176"],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = percentageData[tooltipItem.dataIndex];
            return ` ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Bar chart data
  const barData = {
    labels: ["Weekly Revenue", "Weekly Bookings"],
    datasets: [
      {
        label: "Weekly Summary",
        data: [weeklyRevenue, weeklyBookings],
        backgroundColor: ["#42a5f5", "#66bb6a"],
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Weekly Overview",
        font: { size: 18 },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
     {/* <br/>  <br/> <br/>  */}
      <div style={{ width: "400px", height: "400px" }}>
        <h3 style={{ textAlign: "center" }}>Weekly Stats</h3>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default DashboardChartComponent;
