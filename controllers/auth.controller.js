require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require("../models/user")

module.exports = {
  login: async (req, res) => {
    const userLogin = req.body 

    try {
      const user = await User.findOne({email: userLogin.email})
      if (!user) throw new Error("invalid user")
  
      console.log(user.password, userLogin.password);
      if (user.password !== userLogin.password) throw new Error("invalid user")
  
      const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY)
  
      res.json({
        message: "login successfull",
        userId: user._id,
        token,
      })
    } catch (error) {
      res.json(error.message)
    }
  },

  regis: async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new Error("Email or username is already registered");
      }

      const newUser = new User({
        name,
        username,
        email,
        password,
      });

      const savedUser = await newUser.save();

      res.json({
        message: "Registration successful",
        userId: savedUser._id,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  
}