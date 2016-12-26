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
		data = data || {};
		view.objId = data.id * 1;
		taskHub.get(data.id).then(function(result){
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
			taskHub.pub("Task", "delete", view.objId);
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
	taskHub.pub("Task", "update", props);
}
