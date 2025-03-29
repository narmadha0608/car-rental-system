const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const { sendforuserEmail, sendforadminEmail } = require("../utils/email");
const userModel = require("../models/userModel");
const stripe = require("stripe")(
  "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
);

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: token.email
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
        
    //   }
    // );

    // if (payment) {
      req.body.transactionId = token.id;//payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();

      console.log(req.body);
      

      const bookingDetails = {
        bookingId: newbooking._id,
        userId: req.body.user,
        carId: req.body.car,
        userName: req.body.token.card.name,
        carModel: req.body,
        fromTime: req.body.bookedTimeSlots.from,
        toTime: req.body.bookedTimeSlots.to,
        totalHours: req.body.totalHours,
        totalAmount: req.body.totalAmount,
        transactionId: req.body.transactionId,
        driverRequired:req.body.driverRequired
    };
    
   

   await sendforuserEmail(req.body.token.email, bookingDetails);
   const user = await userModel.find()

   user.map(async (user) => {
    if(user.role === 'admin'){
      await sendforadminEmail(user.username, bookingDetails);
    }
  }

  )

      res.send("Your booking is successfull");
    // } else {
    //   return res.status(400).json(error);
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;
