import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Delete, Edit, Add } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  TextField,
  Box,
  Grow,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const SearchBar = styled(TextField)({
  marginBottom: "20px",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "8px",
});

const AnimatedCard = motion(Card);

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setTotalCars(cars.filter((car) => car.name.toLowerCase().includes(value)));
  }

  function handleDelete(carid) {
    setSelectedCarId(carid);
    setOpenDialog(true);
  }

  function confirmDelete() {
    dispatch(deleteCar({ carid: selectedCarId }));
    setOpenDialog(false);
  }

  return (
    <DefaultLayout>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          🚗 Admin Panel
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Total Cars: {totalCars.length}
        </Typography>
        <SearchBar
          label="Search Cars..."
          variant="outlined"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Button variant="contained" color="textSecondary" startIcon={<Add />} size="large" component={Link} to="/addcar">
          Add Car
        </Button>
      </Box>

      {loading && <Spinner />}

      <Grid container spacing={3} justifyContent="center">
        {totalCars.map((car, index) => (
          <Grow in key={car._id} timeout={index * 300}>
            <Grid item lg={4} md={6} xs={12}>
              <AnimatedCard whileHover={{ scale: 1.05 }} elevation={6}>
                <CardMedia component="img" height="180" image={car.image} alt={car.name} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {car.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    💰 Rent: ₹{car.rentPerHour} / hour
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <Tooltip title="Edit">
                      <IconButton component={Link} to={`/editcar/${car._id}`} color="success">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(car._id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this car?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">No</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
}

export default AdminHome;
