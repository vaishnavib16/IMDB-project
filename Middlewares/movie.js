const Movie = require('../Models/Movie')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs-extra");

exports.getMovieByID = (req, res, next, id) => {
  Movie.findById(id)
    
    .exec((err, movie) => {
      if (err) {
        return res.status(400).json({
          error: "Movie not found",
        });
      }
      req.movie = movie;
      next();
    });
};

exports.createMovie = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
              error: "Problem with Image",
            });
          }

        const { name, description, category, release, duration } = fields;
        if (!name || !description || !release|| !duration) {
            return res.status(400).json({
                error: "All fields are mandatory",
            });
        }
        let movie = new Movie(fields);
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size must be less than 3 MB",
                });
            }
        //    console.log("file",file)
            movie.photo.data = fs.readFileSync(file.photo.filepath);
            movie.photo.contentType = file.photo.type;
        }
        // console.log(movie)
        movie.save((err, movie) => {
            if (err) {
                res.status(400).json({
                    error: "Saving movie in DB failed",
                });
            }
            res.json(movie);
        });
    });
};

exports.getAllMovies = (req, res) => {
    
    Movie.find()
      .select("-photo")
      .populate("category")
      .limit(10)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "Products are not available",
          });
        }
        res.json(products);
      });
  };

exports.photo = (req, res, next) => {
    if (req.movie.photo.data) {
      res.set("Content-Type", req.movie.photo.contentType);
      return res.send(req.movie.photo.data);
    }
    next();
  };
  
  exports.updateMovie = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "Problem with Image",
        });
      }

      let movie = req.movie;
      movie = _.extend(movie, fields);
  
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "file size must be less than 3 MB",
          });
        }
        movie.photo.data = fs.readFileSync(file.photo.filepath);
        movie.photo.contentType = file.photo.type;
      }
      movie.save((err, movie) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            error: "Failed to update the movie",
          });
        }  
        res.json(movie);
      });
    });
  };