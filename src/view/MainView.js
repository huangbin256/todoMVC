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

		d.display("TodoEditInfoView", d.first(view.el, ".right-con"));
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"click; .btn-add": function(evt){
			var view = this;
			d.display("TodoEditPopup", d.first("body"));
		}
	},
	// --------- /Events --------- //


});



