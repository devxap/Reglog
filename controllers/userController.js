const User=require('../models/User');

const getUserInfo = (req,res) =>{
    res.json({user:req.user});
}

module.exports={getUserInfo};