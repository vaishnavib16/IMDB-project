const User=require("../Models/User")


exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in Database"
            });

        }
        req.profile = user;
        next();
    });

};