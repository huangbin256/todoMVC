var d = mvdom; // external lib

/**
 * View: TodoEditPopup
 * Description: Show app TodoEditPopup.
 */

d.register("TodoEditPopup", {
	
	create: function(data, config) {
		return render("tmpl-TodoEditPopup");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"click; .btn-close": function(){
			var view = this;
			d.remove(view.el);
		},
		"click; .btn-save": function(){
			var view = this;
			d.remove(view.el);
		}
	}
	// --------- /Events --------- //


});



