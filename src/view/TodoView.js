var d = mvdom; // external lib
var app = require("../js-app/app.js");
var ds = require("../js-app/ds.js");

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
		},
		"keyup; input[name='searchName']": function(evt){
			var view = this;
			if(evt.keyCode == 13){
				filterItems.call(view);
			}
		},
		"click; .btn-toggle-done": function(evt){
			var view = this;
			var btnEl = evt.target;
			if(app.class.has(btnEl, "show-done")){
				btnEl.innerHTML = "Show All";
				app.class.add(btnEl, "show-all");
				app.class.remove(btnEl, "show-done");
			}else{
				btnEl.innerHTML = "Show Done";
				app.class.add(btnEl, "show-done");
				app.class.remove(btnEl, "show-all");
			}
			filterItems.call(view);
		},
	},
	// --------- /Events --------- //

	hubEvents: {
		"dsHub": {
			"task; delete": function(data, info){
				var view = this;
				refreshTasks.call(view);
			},
			"task; create": function(data, info){
				var view = this;
				d.display("Toast", d.first("body"), {message: "Created Success"});
				window.location.hash = "#todo/"+data.id;
			},
			"task; update": function(data, info){
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
	return ds.list("task").then(function(result){
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

function filterItems(){
	var view = this;
	var inputEl = d.first(view.el, "input[name='searchName']");
	var btnEl = d.first(view.el, ".btn-toggle-done");
	var searchName = inputEl.value;
	var done = app.class.has(btnEl, "show-done") ? false : true;
	d.all(view.el, ".todo-item").forEach(function(todoItemEl){
		var itemName = todoItemEl.innerHTML;
		var doneState = todoItemEl.getAttribute("data-item-state");
		if((!searchName || itemName.toLowerCase().indexOf(searchName) > -1) && (!done || doneState == "true")){
			app.class.remove(todoItemEl, "hide");
		}else{
			app.class.add(todoItemEl, "hide");
		}
	});
}
