var express = require('express');
var router = express.Router();
const User = require('../Models/User')
var jwt = require('jsonwebtoken');
const jwtkey='niraj';
var expressJwt = require('express-jwt');

router.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    const {_id,name,email,role} = result;
    jwt.sign({result},jwtkey, {expiresIn: '2h'},(err,token)=>{
        if(err){
            res.send({result:"something went wrong"})
        }
        res.send({user:{_id,name,email,role}, auth:token})
    })
})

router.post('/login', async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
        if (user) {
            const {_id,name,email,role} = user;
            jwt.sign({user},jwtkey, {expiresIn:"2h"}, (err,token)=>{
                if(err){
                    res.send({result:"Something went wrong"})
                }
                res.send({user:{_id,name,email,role},auth:token})
            })
        }
        else {
            res.send({ Result: "No user Found" })
        }
    }
    else {
        res.send({ Result: "No user Found" })
    }
})

router.get("/signout", (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signed Out Succesfully"
    });
});


module.exports = router;