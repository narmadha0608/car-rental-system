// models/feedbackModel.js

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    username: { type: String, required: true }, // Store username directly
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);

module.exports = feedbackModel;
