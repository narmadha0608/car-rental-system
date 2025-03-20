const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Car = require("../models/carModel");

const router = express.Router();

// Dashboard Data API
router.get("/dashboard-data", async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    // Weekly revenue
    const weeklyRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: lastWeek } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // Weekly bookings
    const weeklyBookings = await Booking.countDocuments({
      createdAt: { $gte: lastWeek },
    });

    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Total users
    const totalUsers = await User.countDocuments();

    // Admin & user count
    const adminCount = await User.countDocuments({ role: "admin" });
    const userCount = await User.countDocuments({ role: "user" });

    // Total cars
    const totalCars = await Car.countDocuments();

    // Total revenue
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      weeklyRevenue: weeklyRevenue[0]?.total || 0,
      weeklyBookings,
      totalBookings,
      totalUsers,
      adminCount,
      userCount,
      totalCars,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

module.exports = router;
