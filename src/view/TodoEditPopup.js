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
				taskHub.create({name: name, done: false});
				d.remove(view.el);
			}else{
				d.remove(view.el);
			}
		},
		"dragstart; .modal-content":function(evt){
			var view = this;
			view._pageX = evt.pageX;
			view._pageY = evt.pageY;
		},
		"dragend; .modal-content": function(evt){
			var view = this;
			evt.preventDefault();
			var contentEl = d.first(view.el, ".modal-content");
			contentEl.style.left = (evt.pageX - view._pageX) + "px";
			contentEl.style.top = (evt.pageY - view._pageY) + "px";
		}
	}
	// --------- /Events --------- //


});


function getOffset(el){
	var view = this;
	var left = el.style.left.replace("px", "") * 1;
	var top = el.style.left.replace("px", "") * 1;
	return {left, top};
}
