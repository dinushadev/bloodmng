'use strict';

var http = require('http'),
express = require('express'),
ejs =require('ejs'),
process = require('process'),
env = process.env.NODE_ENV || 'dev',
config = require('./config')[env],
path = require('path'),
pg = require("pg"),
request = require('request');



var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/static/'));


app.engine('html', ejs.renderFile);

/**
* Render the login page.
*/
app.get('/',  function index(request, response) {

	response.render('index.html');
});

app.post('/login',  function login(request, response) {

	//console.log('psurl'+config.dburl);	
	var usrname=request.body.username;
	var pass =request.body.password;

	pg.connect(config.dburl, function(err, client) {
		if(err){
			console.log('Error in connect to db: '+err);
		}
		//var query = client.query("SELECT * FROM users WHERE uname=dinu");
		     var query = client.query("SELECT uname,pass,email FROM users WHERE uname = $1", [usrname]);

		query.on('row', function(row) {
			console.log('row:'+JSON.stringify(row));
			if(row){
				if(row.pass == pass){
					//TODO add session data
					response.redirect('/home');
					//return;
				}else{
					//invalid pass
					response.redirect('/');
				}
			}else{
				//invalid usrname
				response.redirect('/');
			}
		});
	});

	
});

app.get('/home',  function home(request, response) {

	response.render('home.html');
});


/*exports.login = function login(request, response) {

response.render('index.html', {
error: request.flash('error'),
csrfToken: request.session._csrf
});
};*/


app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});



