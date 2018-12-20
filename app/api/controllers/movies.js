const movieModel = require('../models/movies');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		movieModel.findById(req.params.movieId, function(err, movieInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Movie found", data:{movies: movieInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let moviesList = [];

		movieModel.find({}, function(err, movies){
			if (err){
				next(err);
			} else{
				for (let movie of movies) {
					moviesList.push({id: movie._id, name: movie.name, releaseDate: movie.releaseDate});
				}
				res.json({status:"success", message: "Found some movies", data:{movies: moviesList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Updated"});
			}
		});
	},

	deleteById: function(req, res, next) {
		movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Movie has been deleted" });
			}
		});
	},

	create: function(req, res, next) {
		movieModel.create({ name: req.body.name, releaseDate: req.body.releaseDate }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Movie created"});
				  
				});
	},

}					