import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Rating,
  Container,
  Divider,
  Chip,
  CardMedia,
  TextField,
  MenuItem,
  Button
} from "@mui/material";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCar, setFilterCar] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [reviewRes, carsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/feedbacks/"),
          axios.get("http://localhost:5000/api/cars/getallcars")
        ]);
        setReviews(reviewRes.data);
        setCars(carsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const getCarDetails = (carId) => cars.find((car) => car._id === carId);

  const filteredReviews = reviews.filter((review) => {
    const car = getCarDetails(review.car);
    const matchesSearch =
      review.username.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterCar ? review.car === filterCar : true;
    return matchesSearch && matchesFilter;
  });

  const exportToExcel = () => {
    const data = filteredReviews.map((review) => {
      const car = getCarDetails(review.car);
      return {
        Username: review.username,
        Rating: review.rating,
        Comment: review.comment,
        Date: new Date(review.createdAt).toLocaleString(),
        Vehicle: car?.name || "",
        Fuel: car?.fuelType || ""
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reviews");
    XLSX.writeFile(workbook, "All_Reviews.xlsx");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        🚘 User Reviews
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box display="flex" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Filter by Vehicle"
          variant="outlined"
          size="small"
          value={filterCar}
          onChange={(e) => setFilterCar(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {cars.map((car) => (
            <MenuItem key={car._id} value={car._id}>
              {car.name}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="success" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredReviews.map((review) => {
          const car = getCarDetails(review.car);
          return (
            <Grid item xs={12} sm={6} key={review._id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
                  {car?.image && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={car.image}
                      alt={car.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {review.username}
                    </Typography>
                    <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, display: "block", color: "gray" }}
                    >
                      {new Date(review.createdAt).toLocaleString()}
                    </Typography>
                    {car && (
                      <Box mt={2}>
                        <Chip label={`Vehicle: ${car.name}`} color="info" sx={{ mr: 1 }} />
                        <Chip label={`Fuel: ${car.fuelType}`} variant="outlined" />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AllReviews;