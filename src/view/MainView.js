var d = mvdom; // external lib

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

	// --------- Document Events --------- //
	docEvents: {
		// event for url changes
		"APP_CTX_CHANGE": function(event){
			var view = this;

			showView.call(view);
		}
	}
	// --------- /Document Events --------- //

});

// hashpath / Template View mapping
var viewNameByPath = {
	"todo": "TodoView"
};

function showView(){
	var view = this;
	var path0 = app.ctx.pathAt(0);
	var path1 = app.ctx.pathAt(1);
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

