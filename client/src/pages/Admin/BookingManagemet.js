import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/getallbookings");
      setBookings(response.data);
      calculateRevenue(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const calculateRevenue = (data) => {
    let total = data.reduce((sum, booking) => sum + booking.totalAmount, 0);
    setTotalRevenue(total);
    
    let weekly = data
      .filter((booking) => new Date(booking.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
    setWeeklyRevenue(weekly);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      calculateRevenue(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "Bookings_Report.xlsx");
  };






 
  const exportAllBookingsToPDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); 
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("All Booking Details", 80, 15); 
  
    let startY = 25;
    let cardHeight = 60; 
    let pageHeight = doc.internal.pageSize.height;
  
    bookings.forEach((booking, index) => {
      if (startY + cardHeight > pageHeight - 20) {
        doc.addPage();
        startY = 20; 
      }
  
      doc.setFillColor(230, 230, 230); 
      doc.rect(10, startY, 190, cardHeight, "F"); 
  
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Booking ID: ${booking._id}`, 15, startY + 8);
      doc.text(`User: ${booking.user}`, 15, startY + 16);
      doc.text(`Car: ${booking.name || "N/A"}`, 15, startY + 24);
      doc.text(`Hours: ${booking.totalHours}`, 15, startY + 32);
      doc.text(`Amount: ₹${booking.totalAmount}`, 15, startY + 40);
      
      startY += cardHeight + 10; 
    });
  
    doc.save("All_Bookings_A4.pdf");
  };
  
  


  const exportBookingToExcel = (booking) => {
    const worksheet = XLSX.utils.json_to_sheet([booking]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Booking Details");
    XLSX.writeFile(workbook, `Booking_${booking._id}.xlsx`);
  };

  const exportBookingToPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Booking Details", 80, 15); // Title
  
    let startX = 10;
    let startY = 30;
    let cellWidth = 90;
    let cellHeight = 10;
  
    // Booking Details Array
    const details = [
      ["Booking ID", booking._id],
      ["User", booking.user],
      ["Car", booking.name || "N/A"],
      ["Total Hours", booking.totalHours],
      ["Total Amount", `₹${booking.totalAmount}`],
      ["Transaction ID", booking.transactionId],
      ["Driver Required", booking.driverRequired ? "Yes" : "No"],
    ];
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
   
    doc.setFillColor(50, 150, 250); 
    doc.setTextColor(255, 255, 255); 
    doc.rect(startX, startY, cellWidth * 2, cellHeight, "F"); 
    doc.text("Field", startX + 10, startY + 7);
    doc.text("Value", startX + cellWidth + 10, startY + 7);
  
    startY += cellHeight; 
  
   
    doc.setTextColor(0, 0, 0); 
  
    details.forEach(([field, value], index) => {
      doc.setFillColor(index % 2 === 0 ? 240 : 255); 
      doc.rect(startX, startY, cellWidth, cellHeight, "F");
      doc.rect(startX + cellWidth, startY, cellWidth, cellHeight, "F");
  
      doc.text(field, startX + 10, startY + 7);
      doc.text(value.toString(), startX + cellWidth + 10, startY + 7);
      startY += cellHeight; 
    });
  
    doc.save(`Booking_${booking._id}.pdf`);
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Booking Dashboard</Typography>
      
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card style={{ flex: 1, background: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{bookings.length}</Typography>
          </CardContent>
        </Card>

        <Card style={{ flex: 1, background: "#c8e6c9" }}>
          <CardContent>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">₹{totalRevenue}</Typography>
          </CardContent>
        </Card>

        <Card style={{ flex: 1, background: "#ffecb3" }}>
          <CardContent>
            <Typography variant="h6">Weekly Revenue</Typography>
            <Typography variant="h4">₹{weeklyRevenue}</Typography>
          </CardContent>
        </Card>
      </div>

      <Button variant="contained" color="primary" onClick={exportToExcel} style={{ marginBottom: "10px" }}>
        Export Total Bookings to Excel
      </Button>

      <Button variant="contained" color="warning" onClick={exportAllBookingsToPDF} style={{ marginBottom: "10px" ,marginLeft: "10px"}}>
        Export Total Bookings to PDF
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Driver Required</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking._id}</TableCell>
                <TableCell>{booking.user}</TableCell>
                <TableCell>{booking.name ? booking.name : "N/A"}</TableCell>
                <TableCell>{booking.totalHours}</TableCell>
                <TableCell>₹{booking.totalAmount}</TableCell>
                <TableCell>{booking.transactionId}</TableCell>
                <TableCell>{booking.driverRequired ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(booking._id)}>
                    Delete
                  </Button>
                  <Button variant="contained" color="primary" style={{ marginLeft: "5px" }} onClick={() => exportBookingToExcel(booking)}>
                    Export Excel
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: "5px" }} onClick={() => exportBookingToPDF(booking)}>
                    Export PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingDashboard;
