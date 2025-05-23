const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.post("/login", async(req, res) => {

      const {username , password} = req.body

      try {
          const user = await User.findOne({username , password})
          if(user) {
              res.send(user)
          }
          else{
              return res.status(400).json(error);
          }
      } catch (error) {
        return res.status(400).json(error);
      }
  
});

router.post("/register", async(req, res) => {

    

    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});


router.get("/allusers", async(req, res) => {

    

    try {
        const user = await User.find()
       
        res.send({message:'All users fetched successfully', users:user})

    } catch (error) {
      return res.status(400).json(error);
    }

});

router.delete("/:id", async(req, res) => {

    

    try {
        const user = await User.findByIdAndDelete(params.id)
       
        res.send({message:'All users deleted successfully'})

    } catch (error) {
      return res.status(400).json(error);
    }

});






module.exports = router

