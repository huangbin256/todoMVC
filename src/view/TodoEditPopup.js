var d = mvdom; // external lib
var ds = require("../js-app/ds.js");

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
				ds.create("task", {name: name, done: false});
				d.remove(view.el);
			}else{
				d.remove(view.el);
			}
		},
		"mousedown; .modal-content":function(evt){
			var view = this;
			var contentEl = d.first(view.el, ".modal-content");
			var offset = getOffset.call(view, contentEl);
			view._startOffset = {
				left: evt.pageX - offset.left,
				top: evt.pageY - offset.top
			};
			view._drag = true;
		}
	},
	docEvents: {
		"mousemove":function(evt){
			var view = this;
			if(view._drag){
				var contentEl = d.first(view.el, ".modal-content");
				contentEl.style.left = (evt.pageX - view._startOffset.left) + "px";
				contentEl.style.top = (evt.pageY - view._startOffset.top) + "px";
			}
		},
		"mouseup": function(evt){
			var view = this;
			view._drag = false;
		}
	}
	// --------- /Events --------- //


});


function getOffset(el){
	var view = this;
	var left = el.style.left.replace("px", "") * 1;
	var top = el.style.top.replace("px", "") * 1;
	return {left, top};
}
