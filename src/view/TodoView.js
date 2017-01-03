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
		data = data || {};
		showTodoView.call(view, data.id);
		refreshTasks.call(view);
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"click; .todo-item": function(evt){
			var view = this;
			var targetEl = evt.target;
			var id = targetEl.getAttribute("data-item-id");
			window.location.hash = "#todo/"+id;
		},
		"click; .btn-add": function(evt){
			var view = this;
			d.display("TodoEditPopup", d.first("body"));
		}
	},
	// --------- /Events --------- //

	hubEvents: {
		"taskHub": {
            "Task; delete": function(data, info){
            	var view = this;
                refreshTasks.call(view);
            },
            "Task; create": function(data, info){
            	var view = this;
            	d.display("Toast", d.first("body"), {message: "Created Success"});
				window.location.hash = "#todo/"+data.id;
            },
            "Task; update": function(data, info){
            	var view = this;
                refreshTasks.call(view);
            	d.display("Toast", d.first("body"), {message: "Updated Success"});
            }
        }
	}

});

function showTodoView(id){
	var view = this;
	var todosConEl = d.first(view.el, ".right-con");
	d.empty(todosConEl);
	if(id){
		d.display("TodoEditInfoView", todosConEl, {id: id});
	}
}

function refreshTasks(){
	var view = this;
	var todosConEl = d.first(view.el, ".todos-con");
	d.empty(todosConEl);
	return taskHub.list().then(function(result){
		var todosHtml = render("tmpl-TodoView-todo-item", {todos: result});
		todosConEl.innerHTML = todosHtml;
		showActiveItem.call(view);
	});
}

function showActiveItem(){
	var view = this;
	var path1 = app.ctx.pathAt(1);
	var activeId = path1 * 1;
	var todoEls = d.all(view.el, ".todo-item");
	for(var i = 0; i < todoEls.length; i++){
		app.class.remove(todoEls[i], "active");
	}
	
	if(!isNaN(activeId) && activeId > 0){
		var activeItemEl = d.first(view.el, ".todo-item[data-item-id='"+activeId+"']");
		if(activeItemEl){
			app.class.add(activeItemEl, "active");
		}
	}else if(path1 == "new"){
		d.display("TodoEditPopup", d.first("body"));
	}else{
		var activeItemEl = d.first(view.el, ".todo-item");
		if(activeItemEl){
			activeId = activeItemEl.getAttribute("data-item-id");
			window.location.hash = "#todo/"+activeId;
		}
	}
}

