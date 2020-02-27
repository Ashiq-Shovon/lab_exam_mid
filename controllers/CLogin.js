var express 	= require('express');
var router 		= express.Router();
//const { check, validationResult } = require('express-validator');
var bodyParser 		= require('body-parser');
var userModel	= require.main.require('./models/user-model');

router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/login');
});

router.post('/',
/* [check('uname','username is required').exists(),
	check('password','password must be in 5 characters').isLength({min:5})
]  */
function(req, res){
		//var errors =validationResult(req);
		//console.log(errors.mapped());
		var user ={
			username: req.body.uname,
			password: req.body.password
		};

		userModel.validate(user, function(status){
			
				if(status){
					res.cookie('username', req.body.uname);
					res.redirect('/home');
				}
			
			else{
				res.redirect('/login'/* { errors : errors.mapped()} */);
			}
		});
});

module.exports = router;

