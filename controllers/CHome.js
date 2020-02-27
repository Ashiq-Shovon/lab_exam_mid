var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
//var employeeModel = require.main.require('./models/employee_model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			
			if(result.type == 'admin'){
				res.render('home/index', {user: result});
			}

			else{
				
					res.render('home/user_page')
				
				
			}
			

		
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})

router.get('/profile', function(req, res){
    if(req.cookies['username'] != null){
        console.log(req.cookies['username']);
	userModel.getByUname(req.cookies['username'],function(results){
        console.log(results);
		if(results!=null){
			res.render('home/pInfo', {data: results});
		}else{
			res.send('invalid username/password');
		}
    });
    }
})


router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		company_name:req.body.company_name,
		employer_name:req.body.employer_name,
		contact_no:req.body.contact_no,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})

//insert
/* router.get('/user_page', function(req, res){
	
	
		res.render('home/user_page');
	
})

router.post('/', function(req, res){
	
	var user = {
		company_name: req.body.company_name,
		job_title:req.body.company_title,
		job_location:req.body.job_location,
		salary:req.body.salary,
		
	};

	employeeModel.insert(user, function(status){
		if(status){
			res.render('/home/user_page');
		}else{
			//res.redirect('/home');
		}
	});
}) */

//delete


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
	
})


//employee_add

router.get('/add', function(req, res){
	
	
	res.render('home/insert');

})

router.post('/insert', function(req, res){

var user = {
	username: req.body.username,
	company_name:req.body.company_name,
	employer_name:req.body.employer_name,
	contact_no:req.body.contact_no,
	password: req.body.password,
	type: req.body.type,
	id: req.params.id
};

userModel.insert(user, function(status){
	if(status){
		res.redirect('/home/alluser');
	}else{
		res.redirect('/home/insert');
	}
});
})



module.exports = router;

