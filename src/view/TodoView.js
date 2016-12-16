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
		refreshTasks.call(view);
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

	docEvents: {
		"REFRESH_TASKS": function(){
			var view = this;
			refreshTasks.call(view);
		}
	}

});

function refreshTasks(){
	var view = this;
	var todosConEl = d.first(view.el, ".todos-con");
	d.empty(todosConEl);
	app.get("/task-list").then(function(result){
		var todosHtml = render("tmpl-TodoView-todo-item", {todos: result});
		todosConEl.innerHTML = todosHtml;
	});
}

