var d = mvdom; // external lib

/**
 * View: TodoEditInfoView
 * Description: Show app TodoEditInfoView.
 */

d.register("TodoEditInfoView", {
	
	create: function(data, config) {
		return render("tmpl-TodoEditInfoView");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
	}
	// --------- /Events --------- //


});



