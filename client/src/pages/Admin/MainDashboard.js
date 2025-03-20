import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, PieChart, Pie } from "recharts";
import { motion } from "framer-motion";
import { AttachMoney, DirectionsCar, People, ListAlt } from "@mui/icons-material";
import axios from "axios";
import PieChartComponent from "./chart/chart";

export default function MainDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/dashboard-data")
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching data", err));
    }, []);

    if (!data) return <Typography align="center" variant="h5">Loading...</Typography>;

    const stats = [
        { icon: <AttachMoney fontSize="large" />, title: "Total Revenue", value: `₹${data.totalRevenue}`, bgColor: "#FF6F61" },
        { icon: <ListAlt fontSize="large" />, title: "Total Bookings", value: data.totalBookings, bgColor: "#6A0572" },
        { icon: <People fontSize="large" />, title: "Total Users", value: data.totalUsers, bgColor: "#0F9D58" },
        { icon: <DirectionsCar fontSize="large" />, title: "Total Cars", value: data.totalCars, bgColor: "#FFAA00" },
    ];

    const barChartData = [
        { name: "This Week", revenue: data.weeklyRevenue, bookings: data.weeklyBookings },
        { name: "Total", revenue: data.totalRevenue, bookings: data.totalBookings }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card sx={{ backgroundColor: stat.bgColor, color: "white", textAlign: "center", p: 3, borderRadius: 3, boxShadow: 5 }}>
                                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>{stat.icon}</Box>
                                <Typography variant="h6">{stat.title}</Typography>
                                <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 5 }}>
                        <Typography variant="h6" gutterBottom>Revenue & Bookings</Typography>
                        {/* <ResponsiveContainer width="100%" height={800}>
                            <PieChart width={800} height={800}>
                                <Tooltip />
                                <Legend />
                                <Pie
                                    data={barChartData}
                                    dataKey="revenue"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={350}
                                    fill="#ff512f"
                                    label 
                                    height={1400}
                                    width={1400}
                                />
                                <Pie
                                    data={barChartData}
                                    dataKey="bookings"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={250}
                                    outerRadius={360}
                                    fill="#36d1dc"
                                    label
                                    height={1400}
                                    width={1400}
                                />
                            </PieChart>
                        </ResponsiveContainer> */}
                        <PieChartComponent data={data}/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
