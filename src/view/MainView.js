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
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"click; .btn-click-me": function(evt){
			var view = this;
			var targetEl = evt.target;
			var resultEl = d.first(view.el, ".click-count");
			resultEl.innerHTML = (resultEl.innerHTML * 1) + 1;
		}
	},
	// --------- /Events --------- //


});



