import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);



const PieChartComponent = (props) => {
// Sample data (replace with dynamic values)

console.log(props.data);


const totalRevenue = props.data.totalRevenue;
const totalBookings = props.data.totalBookings;
const totalUsers = props.data.totalUsers;
const totalCars =props.data.totalCars;

// Calculate total sum
const totalSum = totalRevenue + totalBookings + totalUsers + totalCars;

// Calculate percentage for each category
const dataValues = [totalRevenue, totalBookings, totalUsers, totalCars];
const dataLabels = ["Revenue", "Bookings", "Users", "Cars"];
const percentageData = dataValues.map((value) =>
  ((value / totalSum) * 100).toFixed(2)
);

// Prepare dataset with percentage in labels
const data = {
  labels: dataLabels.map(
    (label, index) => `${label} (${percentageData[index]}%)`
  ),
  datasets: [
    {
      data: dataValues,
      backgroundColor: ["#ff512f", "#36d1dc", "#4caf50", "#ffeb3b"],
      hoverBackgroundColor: ["#ff784f", "#58e0f5", "#66bb6a", "#fff176"],
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          let value = tooltipItem.raw;
          let percentage = percentageData[tooltipItem.dataIndex];
          return ` ${value} (${percentage}%)`;
        },
      },
    },
  },
};

  return (
    <div style={{ width: "500px", height: "500px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
