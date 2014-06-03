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
app.get('/',  function login(request, response) {

	response.render('index.html');
});

app.get('/login',  function login(request, response) {

	console.log('ddd'+config.dburl);	

	pg.connect(config.dburl, function(err, client) {
		if(err){
			console.log('Error in connect to db: '+err);
		}
  var query = client.query('SELECT * FROM users;');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});

	response.render('index.html');
});

app.get('/home',  function login(request, response) {

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



