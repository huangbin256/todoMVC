var app = require('./server.js');


app.init().then(function(){
	app.start();
});