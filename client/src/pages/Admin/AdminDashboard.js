import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  IconButton,
} from "@mui/material";
import { Dashboard, DirectionsCar, People, RateReview, Book, Menu } from "@mui/icons-material";
import { motion } from "framer-motion";
import Vehiclemanagement from "./Vehiclemanagement";
import BookingDashboard from "./BookingManagemet";
import UsersManagement from "./UserManagement";
import MainDashboard from "./MainDashboard";
import AllReviews from "./ReviewMnagement";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, component: "dashboard" },
  { text: "Booking Management", icon: <Book />, component: "booking" },
  { text: "Vehicle Inventory Management", icon: <DirectionsCar />, component: "inventory" },
  { text: "Feedback and Reviews", icon: <RateReview />, component: "feedback" },
  { text: "User Management", icon: <People />, component: "users" },
];

const DashboardPage = () => <Typography variant="h4">Dashboard Page</Typography>;
const BookingPage = () => <Typography variant="h4">Booking Management Page</Typography>;
const InventoryPage = () => <Typography variant="h4">Vehicle Inventory Management Page</Typography>;
const FeedbackPage = () => <Typography variant="h4">Feedback and Reviews Page</Typography>;
const UsersPage = () => <Typography variant="h4">User Management Page</Typography>;

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderPage = () => {
    switch (selectedPage) {
      case "booking":
        return <BookingDashboard />;
      case "inventory":
        return <Vehiclemanagement />;
      case "feedback":
        return <AllReviews />;
      case "users":
        return <UsersManagement />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 70,
            transition: "width 0.3s ease-in-out",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <motion.div whileHover={{ scale: 1.1 }} key={index}>
              <ListItem 
                button
                onClick={() => setSelectedPage(item.component)}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {renderPage()}
      </Box>
    </Box>
  );
}
