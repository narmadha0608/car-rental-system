import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  const [dashboardData, setDashboardData] = useState({
    weeklyRevenue: 0,
    weeklyBookings: 0,
    totalBookings: 0,
    totalUsers: 0,
    adminCount: 0,
    userCount: 0,
    totalCars: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard-data");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // ----- Bar + Line chart config -----
  const combinedChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        type: "bar",
        label: "Bookings",
        data: [5, 8, 4, dashboardData.weeklyBookings],
        backgroundColor: "#2979ff",
        borderRadius: 6,
      },
      {
        type: "line",
        label: "Revenue",
        data: [200, 400, 300, dashboardData.weeklyRevenue],
        borderColor: "#ffca28",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
      },
    ],
  };

  const combinedChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  // ----- Pie chart config -----
  const pieDataValues = [
    dashboardData.totalUsers,
    dashboardData.adminCount,
    dashboardData.totalCars,
    dashboardData.totalBookings,
  ];

  const totalSum = pieDataValues.reduce((sum, v) => sum + v, 0);
  const pieLabels = ["Users", "Admins", "Cars", "Bookings"];
  const piePercentages = pieDataValues.map((val) =>
    totalSum === 0 ? "0.00" : ((val / totalSum) * 100).toFixed(2)
  );

  const pieData = {
    labels: pieLabels.map((label, idx) => `${label} (${piePercentages[idx]}%)`),
    datasets: [
      {
        data: pieDataValues,
        backgroundColor: ["#42a5f5", "#ef5350", "#ffee58", "#66bb6a"],
        hoverOffset: 8,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {/* Bar + Line chart */}
      <div style={{ width: "500px", height: "400px", background: "#f9f9f9", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h4 style={{ marginBottom: "1rem", color: "#333" }}>
          Website Visits <span style={{ color: "#00e676" }}>(+43% than last year)</span>
        </h4>
        <Chart type="bar" data={combinedChartData} options={combinedChartOptions} />
      </div>
  
      {/* Pie chart */}
      <div style={{ width: "400px", height: "400px", background: "#f9f9f9", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h4 style={{ marginBottom: "1rem", color: "#333" }}>Current Stats</h4>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
  
};

export default DashboardCharts;
