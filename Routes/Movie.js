var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Middlewares/auth');
const Movie = require('../Models/Movie')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { createMovie, photo, getAllMovies, updateMovie, getMovieByID } = require('../Middlewares/movie');
const { getUserById } = require('../Middlewares/user');
var router = express.Router();

router.param("movieId", getMovieByID);
// router.param("userId",getUserById)

router.post("/movie/create", createMovie);
router.get("/movies", getAllMovies);
router.get("/movie/photo/:movieId", photo);

router.delete("/movie/:id", async (req, res) => {
    const result = await Movie.deleteOne({ _id: req.params.id });
    res.send(result)
});

router.get('/movie/:id', async (req, res) => {
    const result = await Movie.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send("No record found")
    }
})

router.put('/movie/:id', async (req, res) => {
    const result = await Movie.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
        res.send(result)
})
router.get('/search/:key',async(req,res)=>{
    let result= await Movie.find({
        "$or":[
            {name:{$regex:req.params.key}},
            
        ]
    })
    res.send(result)
})



// router.put('/movie/:movieId',updateMovie)

module.exports = router;