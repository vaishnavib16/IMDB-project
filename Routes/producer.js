var express = require('express');
var router = express.Router();
let Producer=require("../Models/Producer")

router.post('/add/producer',async(req,res)=>{
    let producer= new Producer(req.body);
    producer.save((err,producer)=>{
        if(err){
          return res.status(400).json("Unable to save producer")
        }
        res.json({producer})
    })
})

router.get('/producers')


module.exports = router;
