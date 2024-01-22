const brcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
const config=require('../config');
const User=require('../models/User');
const tokenizer = require("../utils/tokenizer");

const register= async (req, res)=>{
    try {
        const {username, password, role} = req.body;

        const hashedPassword = await brcrypt.hash(password,10);
        
        const user=new User({
            username,
            password:hashedPassword,
            role,
        });

        await user.save();

        res.json({message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log("authController->register-"+error);
    }
};

const login = async (req,res)=>{
    try {
        const {username, password, role} = req.body;
         const user= await User.findOne({username});

         if(!user){
            return res.status(401).json({message:"Inavalid Credentials"});
         }

         const passwordMatched=brcrypt.compare(password,user.password);

         if(!passwordMatched){
            return res.status(401).json({message:"Invalid Credentials"});
         }
         const token=tokenizer.generateToken({user:{id:user._id, role:user.role}});

         res.json({token});

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log("authController->login-"+error);

    }
}

module.exports={register, login};