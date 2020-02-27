//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
const { check, validationResult } = require('express-validator');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var CLogin 			= require('./controllers/CLogin');
var CLogout 			= require('./controllers/CLogout');
var CHome 			= require('./controllers/CHome');

var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/abc', express.static('xyz'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/login', CLogin);
app.use('/logout', CLogout);
app.use('/home', CHome);


//routes
app.get('/', function(req, res){
	res.render('index');
});



//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
