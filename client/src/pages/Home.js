import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker, Button, Card, Input, Modal, Rate, message } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import axios from "axios";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  // const { user } = useSelector((state) => state.userReducer); // Assuming user info is stored in Redux
  const [totalCars, setTotalcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const user = JSON.parse(localStorage.getItem("user"));

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    const selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    const selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    const filteredCars = cars.filter((car) => {
      if (car.bookedTimeSlots.length === 0) return true;

      return !car.bookedTimeSlots.some((booking) =>
        selectedFrom.isBetween(booking.from, booking.to) ||
        selectedTo.isBetween(booking.from, booking.to) ||
        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
        moment(booking.to).isBetween(selectedFrom, selectedTo)
      );
    });

    setTotalcars(filteredCars);
  }

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setTotalcars(cars.filter((car) => car.name.toLowerCase().includes(value)));
  }

  const openReviewModal = async (car) => {
    setSelectedCar(car);
    setReviewModalVisible(true);
    try {
      const res = await axios.get(`/api/feedbacks/car/${car._id}`);
      setReviews(res.data);
    } catch (err) {
      message.error("Failed to load reviews");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      if (!rating || !comment) {
        return message.warning("Please provide rating and comment");
      }

      await axios.post("/api/feedbacks/add", {
        user: user?._id,
        username: user?.username,
        car: selectedCar._id,
        rating,
        comment
      });

      message.success("Review submitted!");
      setComment("");
      setRating(0);
      openReviewModal(selectedCar); // Refresh reviews
    } catch (err) {
      message.error("Error submitting review");
    }
  };

  return (
    <DefaultLayout>
      <div className="home-header">
        <h2>🚗 Find Your Perfect Ride</h2>
        <RangePicker 
          showTime={{ format: "HH:mm" }} 
          format="MMM DD yyyy HH:mm" 
          onChange={setFilter}
          className="date-picker"
        />
        <Input
          placeholder="Search cars..."
          onChange={handleSearch}
          value={searchTerm}
          className="search-box"
        />
      </div>

      {loading && <Spinner />}

      <Row justify="center" gutter={[24, 24]}>
        {totalCars.map((car) => (
          <Col lg={6} sm={24} xs={24} key={car._id}>
            <Card
              hoverable
              cover={<img alt={car.name} src={car.image} className="car-image" />}
              className="car-card"
            >
              <div className="car-details">
                <h3 className="car-name">{car.name}</h3>
                <p className="rent-price">💰 Rent: ₹{car.rentPerHour} / hour</p>
                <Button className="book-btn">
                  <Link to={`/booking/${car._id}`} style={{ color: "white" }}>
                    Book Now
                  </Link>
                </Button>
                <Button type="link" onClick={() => openReviewModal(car)}>
                  ⭐ View/Add Reviews
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Review Modal */}
      <Modal
        title={`Reviews for ${selectedCar?.name}`}
        open={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={null}
      >
        <div>
          <h4>Existing Reviews</h4>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((rev, i) => (
              <div key={i} style={{ marginBottom: 15, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                <strong>{rev.username}</strong>
                <Rate disabled defaultValue={rev.rating} />
                <p>{rev.comment}</p>
              </div>
            ))
          )}

          <h4>Add Your Review</h4>
          <Rate onChange={setRating} value={rating} />
          <Input.TextArea
            rows={3}
            placeholder="Your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginTop: 8 }}
          />
          <Button type="primary" block onClick={handleReviewSubmit} style={{ marginTop: 10 }}>
            Submit Review
          </Button>
        </div>
      </Modal>
    </DefaultLayout>
  );
}

export default Home;
