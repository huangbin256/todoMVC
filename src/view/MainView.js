var d = mvdom; // external lib

/**
 * View: MainView
 * Description: Show app main view.
 */

d.register("MainView", {
	
	create: function(data, config) {
		// first empty the content
		d.first("body").innerHTML = "";

		return render("tmpl-MainView");
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
	},
	// --------- /Events --------- //


});



