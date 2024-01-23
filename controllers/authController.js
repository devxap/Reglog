const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
const config=require('../config');
const User=require('../models/User');

const register = async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        password: hashedPassword,
        role,
      });
  
      await user.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log('authController->register'+err);
    }
  };
  

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ user: { id: user._id, role: user.role } }, config.jwtSecret, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = { register, login };