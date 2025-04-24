// controllers/feedbackController.js

const Feedback = require("../models/feedbackmodel");
const User = require("../models/userModel");

exports.addFeedback = async (req, res) => {
    try {
        const { user, car, rating, comment } = req.body;

        // Get username from user ID
        const userData = await User.findById(user);
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        const newFeedback = new Feedback({
            user,
            username: userData.username,
            car,
            rating,
            comment
        });

        await newFeedback.save();
        res.status(201).send("Feedback submitted successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFeedbacksByCar = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ car: req.params.carId });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
