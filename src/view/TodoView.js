var d = mvdom; // external lib

/**
 * View: TodoView
 * Description: Show app main view.
 */

d.register("TodoView", {
	
	create: function(data, config) {

		return render("tmpl-TodoView");
	},

	postDisplay: function(data, config){
		var view = this;
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



