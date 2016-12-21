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
		var contentEl = d.first(view.el, ".MainView-content");
		d.empty(contentEl);
		if(app.pref.get("username")){
			d.display("TodoView", contentEl);
		}else{
			d.display("LoginView", contentEl);
		}
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


});



