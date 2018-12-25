const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		
        userModel.create({  
            email: req.body.email, 
            password: req.body.password 
        }, function (err, userInfo) {
				  if (err) 
					  next(err);
					else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "You have succesfully created account", data:{user: userInfo, token:token}});	

						}
					}
				  	//res.json({status: "success", message: "User added"});
				  
				});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "You have been authenticated", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!", });

						}
					}
				});
    },
    
    logOut: function(req, res, next){
        return res.redirect('/logout')
    }

}					