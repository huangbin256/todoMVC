var d = mvdom;
var app = require("./app.js");

app.pref = {
	set : function(key, value) {
		storage(key, value);
	},
	get : function(key, defaultVal) {
		var val = storage(key);
		return val ? val : defaultVal;
	}
};

function storage(name, value) {
	if ( typeof value !== 'undefined') {
		localStorage[name] = value;
	} else {
		var cookieValue = null;
		if (localStorage && localStorage[name]) {
			cookieValue = localStorage[name];
		}
		return cookieValue;
	}
};