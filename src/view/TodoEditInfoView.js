var d = mvdom; // external lib
var ds = require("../js-app/ds.js");
var render = require("../js-app/render.js").render;

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
		data = data || {};
		view.objId = data.id * 1;
		ds.get("task", view.objId).then(function(result){
			renderTask.call(view, result);
		});
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"click; .btn-update": function(evt){
			var view = this;
			saveTask.call(view);
		},
		"click; .btn-delete": function(evt){
			var view = this;
			ds.delete("task", view.objId);
			d.remove(view.el);
		}
	}
	// --------- /Events --------- //


});

function renderTask(task){
	var view = this;
	task.done = task.done ? "true" : "false";
	task.description = task.description ? task.description : "";
	d.push(view.el, task);
}

function saveTask(){
	var view = this;
	var props = {};
	props.id = view.objId;
	props = Object.assign(props, d.pull(view.el));
	// prop.done = props.done == "true" ? true : false;
	ds.update("task", view.objId, props);
}
