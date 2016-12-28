var d = mvdom;
var app = require("./app.js");

app.class = {
	has : function(obj, cls) {
		return hasClass(obj, cls);
	},
	add : function(obj, cls) {
		addClass(obj, cls);
	},
	remove : function(obj, cls) {
		removeClass(obj, cls);
	}
};

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  