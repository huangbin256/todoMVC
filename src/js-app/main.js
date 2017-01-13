var d = mvdom; // external lib
var app = require("./app.js");
var route = require("./route.js");

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("DOM fully loaded and parsed");
	d.display("MainView", d.first("body")).then(function(){
		route.init();
	});
});
