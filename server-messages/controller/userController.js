const User=require('../models/userModel')
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
   
    let { email, password, role } = req.body;
  
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
     
      const isAdminAccount = (await User.countDocuments()) === 0;
    
      let user = await User.findOne().where("email").equals(email);
      if (user) {
        return res.json({ msg: "Staff ID already in use" });
      }
      let newUser = await User.create({
        email,
        password: hashedPassword,
        role: isAdminAccount ? "admin" : "user",
      });
      if (!newUser) {
        return res.json({ msg: "Failed to create user" });
      }
      res.json({ newUser, msg: "New user added" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  const login = async (req, res) => {
    
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.json({ msg: "User not found" });
  
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) return res.json({ msg: "Invalid credentials" });
      res.status(200).json({
        msg: "Log in successful",
        user: user.role,
        user,
      });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  };

  module.exports={createUser,login}