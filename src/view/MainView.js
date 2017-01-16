var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: MainView
 * Description: Show app main view.
 */

d.register("MainView", {
	
	create: function(data, config) {
		// first empty the content
		d.first("body").innerHTML = "";

		return render("tmpl-MainView", {user: app.pref.get("username")});
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
		"click; .logout": function(){
			var view = this;
			app.pref.set("username", "");
			window.location.reload(true);
		}
	},
	// --------- /Events --------- //

	// --------- Hub Events --------- //
	hubEvents: {
		// event for url changes
		"routeHub;CHANGE": function(event){
			var view = this;

			showView.call(view);
		}
	}
	// --------- /Hub Events --------- //

});

// hashpath / Template View mapping
var viewNameByPath = {
	"todo": "TodoView"
};

function showView(){
	var view = this;
	var path0 = route.pathAt(0);
	var path1 = route.pathAt(1);
	var contentViewName = viewNameByPath[path0];

	var contentEl = d.first(view.el, ".MainView-content");
	d.empty(contentEl);
	if(app.pref.get("username")){
		if(!path0 || path0 == "todo"){
			d.display("TodoView", contentEl, {id: path1});
		}
	}else{
		d.display("LoginView", contentEl);
	}

}

