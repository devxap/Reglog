const Role=require('../models/Role');


const roleMiddleware=(roleName)=> async(req,res,next)=>{
    try {
        const role=Role.findOne({name:roleName});
        if(!role){
            return res.status(500).json({message:"Role not found"});
        }

        if(req.user.role.toString()!==role._id.toString()){
            return res.status(500).json({message:"Forbidden"});
        }

        next();
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log("roleMiddleware->roleMiddleware-"+error);
        return;
    }
}

module.exports=roleMiddleware;