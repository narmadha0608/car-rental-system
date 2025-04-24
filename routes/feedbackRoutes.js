// routes/feedbackRoutes.js

const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// POST feedback
router.post("/add", feedbackController.addFeedback);

// GET feedbacks by car ID
router.get("/car/:carId", feedbackController.getFeedbacksByCar);

// GET all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

module.exports = router;
