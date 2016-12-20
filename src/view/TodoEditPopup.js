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

			var name = d.first(view.el, "input[name='name']").value;
			if(name){
				taskHub.pub("Task", "create", {name: name, done: false});
				d.remove(view.el);
			}else{
				d.remove(view.el);
			}
		}
	}
	// --------- /Events --------- //


});



