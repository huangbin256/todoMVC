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
	d.first(view.el, "input[name='name']").value = task.name;
	if(task.description){
		d.first(view.el, "textarea[name='description']").value = task.description;
	}

	if(task.done){
		d.first(view.el, "input[name='done'][value='true']").checked = true;
	}else{
		d.first(view.el, "input[name='done'][value='false']").checked = true;
	}
}

function saveTask(){
	var view = this;
	var props = {};
	props.id = view.objId;
	props.name = d.first(view.el, "input[name='name']").value;
	props.description = d.first(view.el, "textarea[name='description']").value;

	var checkboxEl = d.first(view.el, "input[name='done']:checked");

	props.done = false;
	if(checkboxEl.value == 'true'){
		props.done = true;
	}

	taskHub.pub("Task", "update", props);
}
