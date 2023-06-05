
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Sanketisagoodbo$y'

// ROUTE 1: Create a user using : POST "api/auth/createuser". NO login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });//finding the user based on unique email 
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass ,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
     
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);


// ROUTE 2: Authenticate a user using : POST "api/auth/login". NO login required
router.post("/login",[  
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").exists()
],
async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try{
    let user = await User.findOne({email});//finding the user based on unique email 
    if (!user) {
      return res
        .status(400)
        .json({success, error: "Please enter the correct credentials" });
    }
    const passwordComapre = await bcrypt.compare(password, user.password);
    if (!passwordComapre) {
      
      return res
        .status(400)
        .json({ success, error: "Please enter the correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
})

// ROUTE 3: Get loggedin user deatil using : POST "api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req,res)=>{
  try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
})

module.exports = router;
