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
		var query = client.query("SELECT uname,pass,email,utype FROM users WHERE uname = $1", [usrname],function(err, result) {
			if(err){
				console.log('Erro in query: '+err);
				response.redirect('/');
				return;
			}


			console.log('row:'+JSON.stringify(result.rows));
			if(result.rows[0]){
				if(result.rows[0].pass == pass){
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
			//done();
		});

/*		query.on('row', function(row) {
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
		   query.on('error', function(error) {
		   	console.log('errrooooooooooo'+error)
          		})
		query.on('oid', function(row) {
			response.redirect('/');
		});*/

});


});

app.get('/home',  function home(request, response) {

	response.render('home.html');
});


app.post('/hospital',  function home(request, response) {

	console.log('request:'+JSON.stringify(request.body));
	pg.connect(config.dburl, function(err, client) {
		if(err){
			console.log('Error in connect to db: '+err);
		}


		var sql = 'INSERT INTO hospital (hname,pov,dis,city,descr) VALUES($1,$2,$3,$4,$5)';
		client.query(sql,[request.body.hname,request.body.hprovince,request.body.hdist,request.body.hcity,request.body.hdesc],function(err,result){
			if(err){
				console.log('Erro in query: '+err);
				response.statusCode=400;
				response.send('error occurred');
				return;
			}

			if(result.rowCount>0){
				
				response.statusCode=201;
				response.send('New hospital succesfully added.');
			}else{
				
				response.statusCode=200;
				response.send('Sorry No record was added.');
			}
		});

		
	});

	//response.send('OK');
});

app.get('/hospital',  function home(request, response) {

	console.log('request id:'+request.body.hid);
	var sql;
	if(request.body.hid){
		sql = 'SELECT hname,pov,dis,city FROM hospital WHERE=$1';
	}else{
		sql = 'SELECT hname,pov,dis,city FROM hospital ';
	}

	pg.connect(config.dburl, function(err, client) {
		if(err){
			console.log('Error in connect to db: '+err);
		}


		var sql = 'SELECT hname,pov,dis,city FROM hospital ';
		client.query(sql,function(err,result){
			
			if(err){
				console.log('Erro in query: '+err);
				response.statusCode=400;
				response.send('error occurred');
				return;
			}

			response.send(result.rows);
		//	done();
		});

		
	});
	
	
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



