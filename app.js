const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./db.js'); 
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'secretkey'); 

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
res.json({message: "welcome!"});
});

app.get('/logOut', function(req, res){
    res.json({message: "You have been logged out"})
})

app.use('/users', users);


app.use('/movies', validateUser, movies);




function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message});
    }else{
      
      req.body.userId = decoded.id;
      next();
    }
  });
  
}



app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "error has occured please double check information"});

});

app.listen(3000, function(){
	console.log('server running on port 3000');
});