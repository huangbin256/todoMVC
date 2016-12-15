var utils = require('../utils.js');
var fs = require("fs");

var routes = []; 

// This export One Extension that can have multiple routes 
// that will be loaded by App in app.js
module.exports = routes;

routes.push({
	method: 'POST',
	path:'/login', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var userData = fs.readFile("./server/data/data-users.json", "utf-8", function(err, data){
				var users = JSON.parse(data);
				for(var i = 0; i < users.length; i++){
					var user = users[i];
					if(payload.username == user.username && payload.pwd == user.pwd){
						reply({success: true});
					}else{
						var res = {success: false, errorMessage: "Username or password incorrect"};
						reply(res);
					}
				}

			});
		}
	}
});