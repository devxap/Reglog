const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    const checkUserExists = await User.findOne({ username });

    if(checkUserExists){
      return res.status(400).send({message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      roles: roles,
    });

    await user.save();
    res.json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log('authController->register' + err);
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
      if(!compareRoles(roles,user.roles)){
        return res.status(403).json({error:"Invalid roles"});
      }
    

    const token = jwt.sign({ user: { id: user._id, roles: user.roles } }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).send({message:"Login successful"});
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.signout = async (req, res) => {
  // In a real-world scenario, you might want to invalidate the token on the server or client side.
  await res.json({ message: 'Signout successful' });
};

function compareRoles(rolesInput, rolesAssigned){
  return rolesInput.every(role=> rolesAssigned.includes(role));
}

