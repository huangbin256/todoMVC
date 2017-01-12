var d = mvdom;
var taskHub = d.hub("taskHub");
var app = require("./app.js");


// Subcribe to a topic 
// sub(topic,[labels,] handlerFunction, namespace) 
taskHub.sub("Task",function(data, info){
    console.log("topic: ", info.topic, ", label: ", info.label, ", data: ", data);
},{ns:"namespace"});

taskHub.list =  function(){
	return app.doGet("/task-list");
}

taskHub.get =  function(taskId){
	return app.doGet("/task-get",{id:taskId});
}

taskHub.create =  function(data){
	app.doPost("/task-create", {props: JSON.stringify(data)}).then(function(result){
		taskHub.pub("Task", "create", result);
	});
}

taskHub.update =  function(data){
	app.doPost("/task-update", {props: JSON.stringify(data)}).then(function(result){
		taskHub.pub("Task", "update", result);
	});
}

taskHub.delete =  function(id){
	app.doPost("/task-delete", {id: id}).then(function(result){
		taskHub.pub("Task", "delete", result);
	});
}

window.taskHub = taskHub;