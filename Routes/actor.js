var express = require('express');
var router = express.Router();
let Actor=require('../Models/Actor')
let Producer=require("../Models/Producer")

router.post('/add/actor',async(req,res)=>{
    let actor= new Actor(req.body);
    actor.save((err,actor)=>{
        if(err){
          return res.status(400).json("Unable to save actor")
        }
        res.json({actor})
    })
})





module.exports = router;
